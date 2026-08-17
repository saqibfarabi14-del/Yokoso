#!/usr/bin/env python3
"""Yokoso verification suite. Run from repo root."""
import re, sys, json, subprocess, os

# ---------- component inventory ----------
def extract_inline(html_path):
    html = open(html_path, encoding='utf-8').read()
    m = re.search(r'<script type="text/babel" data-presets="react">\s*\'use strict\';(.*?)</script>\s*</body>', html, re.DOTALL)
    return m.group(1) if m else ''

def find_defined(src):
    d = set()
    for m in re.finditer(r'\bconst\s+([A-Z]\w*)\s*=', src): d.add(m.group(1))
    for m in re.finditer(r'\bfunction\s+([A-Z]\w*)\s*\(', src): d.add(m.group(1))
    return d

def find_used(src):
    return {m.group(1) for m in re.finditer(r'<([A-Z]\w*)[\s/>]', src)}

def read(p): return open(p, encoding='utf-8').read()

components = read('shared/components.js')
shared_defined = (find_defined(read('shared/core.js'))
                  | find_defined(read('shared/menu-data.js'))
                  | find_defined(read('shared/hooks.js'))
                  | find_defined(components))

fail = False
print("== COMPONENT INVENTORY ==")
for page in ['index.html', 'menu.html']:
    inline = extract_inline(page)
    if not inline:
        print(f"  {page}: !! inline script not matched"); fail = True; continue
    all_defined = shared_defined | find_defined(inline)
    missing = (find_used(inline) | find_used(components)) - all_defined
    print(f"  {page}: {'CLEAR' if not missing else 'MISSING ' + str(sorted(missing))}")
    if missing: fail = True

# ---------- top-level const collision check ----------
print("== SCOPE COLLISIONS (top-level const/function across load chain) ==")
def toplevel_names(src):
    names = {}
    src = re.sub(r'//[^\n]*', '', re.sub(r'/\*.*?\*/', '', src, flags=re.S))
    for m in re.finditer(r'^(?:const|let|function)\s+(\w+)', src, re.M):
        names.setdefault(m.group(1), 0)
        names[m.group(1)] += 1
    return set(names)

chain_shared = ['shared/core.js','shared/menu-data.js','shared/hooks.js','shared/components.js']
for page in ['index.html','menu.html']:
    seen, dupes = {}, []
    for f in chain_shared:
        for n in toplevel_names(read(f)):
            if n in seen: dupes.append(f"{n} ({seen[n]} & {f})")
            else: seen[n] = f
    for n in toplevel_names(extract_inline(page)):
        if n in seen: dupes.append(f"{n} ({seen[n]} & {page} inline)")
    print(f"  {page}: {'CLEAR' if not dupes else 'COLLISION ' + str(dupes)}")
    if dupes: fail = True

# ---------- duplicate DOM ids ----------
print("== DUPLICATE id= (static, per page) ==")
for page in ['index.html','menu.html']:
    src = read(page)
    src = re.sub(r'//[^\n]*', '', re.sub(r'/\*.*?\*/', '', src, flags=re.S))
    ids = re.findall(r'\bid=["\']([^"\'{]+)["\']', src)
    dup = {i for i in ids if ids.count(i) > 1}
    print(f"  {page}: {'CLEAR' if not dup else 'DUPLICATE ' + str(sorted(dup))}")
    if dup: fail = True

# ---------- dish counts ----------
print("== DISH COUNTS ==")
EXPECTED = {'dimSum':17,'appetizers':11,'salads':3,'noodles':5,'ramen':3,'rice':11,
            'soup':3,'chicken':11,'beef':3,'seafood':8,'wholeFish':2,'vegetable':4,
            'desserts':3,'beverages':9,'sushi':24,'sushiCombos':2,'bento':2}
node = subprocess.run(['node','-e','''
const fs=require('fs'); const src=fs.readFileSync('shared/menu-data.js','utf8');
const r=(new Function(src+'; return {MENU, COMPASS_CHAPTERS};'))();
const counts={}; for (const k of Object.keys(r.MENU)) counts[k]=r.MENU[k].length;
console.log(JSON.stringify({counts, chapters:r.COMPASS_CHAPTERS.map(c=>({id:c.anchorId,n:c.count||null}))}));
'''], capture_output=True, text=True)
if node.returncode != 0:
    print("  !! node eval failed:", node.stderr.strip()[:300]); fail = True
else:
    data = json.loads(node.stdout)
    counts = data['counts']
    total = sum(counts.values())
    bad = {k:(v,EXPECTED.get(k)) for k,v in counts.items() if EXPECTED.get(k)!=v}
    extra = set(counts) - set(EXPECTED)
    print(f"  total dishes: {total} (expected 121) | categories: {len(counts)} (expected 17)")
    print(f"  {'CLEAR' if not bad and not extra and total==121 else 'MISMATCH ' + str(bad) + ' extra=' + str(extra)}")
    if bad or extra or total != 121: fail = True
    print(f"  chapters: {[c['id'] for c in data['chapters']]}")

print("\nRESULT:", "FAIL" if fail else "ALL CLEAR")
sys.exit(1 if fail else 0)

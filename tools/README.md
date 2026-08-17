# Verification tools

Run from the repo root before every deploy.

    python3 tools/verify.py     # component inventory, scope collisions, duplicate ids, dish counts
    npm i @babel/standalone@7.24.7
    node tools/jsxcheck.js      # JSX syntax, pinned to the exact Babel the site loads

`verify.py` checks:
  1. Component inventory — every <Capitalized> JSX tag used has a definition
     somewhere in that page's actual load chain. Catches the class of bug where a
     shared component is defined in only one page's inline script.
  2. Top-level scope collisions — all <script> tags share one global lexical
     scope, so a duplicate top-level const throws a parse-time SyntaxError that
     silently kills the whole script. Comment-stripped, top-level only.
  3. Duplicate DOM ids — invalid HTML, breaks getElementById and anchor jumps.
  4. Dish counts — 121 dishes across 17 categories, evaluated from menu-data.js.

`jsxcheck.js` transforms components.js and both pages' inline scripts through
Babel 7.24.7 (the pinned CDN version). A different Babel version can give a
false pass or fail relative to what the real page does.

Both exit non-zero on failure.

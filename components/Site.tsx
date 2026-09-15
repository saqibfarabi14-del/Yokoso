"use client";

import { useState } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { BrandStatement } from "./BrandStatement";
import { SushiBoat } from "./SushiBoat";
import { MenuHighlights } from "./MenuHighlights";
import { ChefsPicks } from "./ChefsPicks";
import { PrivateDining } from "./PrivateDining";
import { Visit } from "./Visit";
import { Footer } from "./Footer";
import { Reservation } from "./Reservation";
import { Grain } from "./Grain";
import { ScrollProgress } from "./ScrollProgress";

export function Site() {
  const [resOpen, setResOpen] = useState(false);
  const openRes = () => setResOpen(true);
  const closeRes = () => setResOpen(false);

  return (
    <>
      <div className="ambient" aria-hidden="true" />
      <Grain />
      <ScrollProgress />
      <Header onReserve={openRes} />
      <main id="top" className="relative z-[2]">
        <Hero />
        <BrandStatement />
        <SushiBoat />
        <MenuHighlights />
        <ChefsPicks />
        <PrivateDining onEnquire={openRes} />
        <Visit />
        <Footer onReserve={openRes} />
      </main>
      <Reservation open={resOpen} onClose={closeRes} />
    </>
  );
}

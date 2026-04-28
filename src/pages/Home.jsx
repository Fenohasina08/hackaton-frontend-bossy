import React from "react";
import Temoignages from "./Temoignages";
import UniversitiesPage from "./UniversitiesPage";
import Hero from "../components/Hero";
import Footer from "../layouts/Footer";
import RevealOnScroll from "../components/RevealOnScroll";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Le Hero s’affiche immédiatement (pas besoin du reveal, ou tu peux l’ajouter) */}
      <section className="w-full min-h-[20vh]">
        <Hero />
      </section>

      <RevealOnScroll>
        <section className="w-full min-h-[50vh]">
          <UniversitiesPage limit={5} />
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <section className="w-full min-h-[30vh]">
          <Temoignages />
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <section className="w-full min-h-[10vh]">
          <Footer />
        </section>
      </RevealOnScroll>
    </div>
  );
}
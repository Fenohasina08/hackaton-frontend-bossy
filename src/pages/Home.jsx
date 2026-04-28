import React from "react";
import Temoignages from "./Temoignages";
import UniversitiesPage from "./UniversitiesPage";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import RevealOnScroll from "../components/RevealOnScroll";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Section Hero */}
      <section className="w-full min-h-[20vh]">
        <Hero />
      </section>

      {/* Section Universités */}
      <section className="w-full py-10">
        <div className="container mx-auto px-4">
          <UniversitiesPage limit={4} />
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="w-full min-h-[30vh]">
        <Temoignages />
      </section>

      {/* Section Footer */}
      <section className="w-full mt-auto">
        <Footer />
      </section>
    </div>
  );
}
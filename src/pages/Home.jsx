import React from "react";
import Temoignages from "./Temoignages";
import UniversitiesPage from "./UniversitiesPage";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import RevealOnScroll from "../components/RevealOnScroll";

export default function Home() {
  return (
    <div className="flex flex-col ml-[-5vw] w-[100%]">
       <section className="w-full min-h-[20vh]">
        <Hero />
      </section>

      
        <section className="w-full min-h-[50vh]">
          <UniversitiesPage limit={5} />
        </section>
      

        <section className="w-full min-h-[30vh]">
          <Temoignages />
        </section>
        <section className="w-[87.5vw] ml-[2vw]">
          <Footer />
        </section>
    </div>
  );
}
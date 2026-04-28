import React from "react";
import Temoignages from "./Temoignages";
import UniversitiesPage from "./UniversitiesPage";
import Hero from "../components/Hero";
import Footer from "../layouts/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="w-full h-[20%]"> 
        <Hero />
      </div>
      <div className="w-full h-[50%]">
        <UniversitiesPage limit={5} />
      </div>
      <div className="w-full h-[30%]">      
         <p><Temoignages /></p>  
      </div>
      <div className="w-full h-[10%]">
      <p><Footer /></p>
      </div>
    </div>
  );
}
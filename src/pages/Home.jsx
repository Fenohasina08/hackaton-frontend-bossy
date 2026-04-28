import React from "react";
import Temoignages from "./Temoignages";
import UniversitiesPage from "./UniversitiesPage";


export default function Home() {
  return (
    <div className="text-white">
      
       <div className="">
        <UniversitiesPage limit={5} />
      </div>
      <p><Temoignages /></p>
    </div>
  );
}
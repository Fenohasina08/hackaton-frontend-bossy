import React from "react";
import Temoignages from "./Temoignages";
import UniversitiesPage from "./UniversitiesPage";


export default function Home() {
  return (
    <div className="text-white">
      <h1>Home Page</h1>
      <div className="">

        //listes des universites 10
        <UniversitiesPage limit={5} />
      </div>
      <p><Temoignages /></p>
    </div>
  );
}
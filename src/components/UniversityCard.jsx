import React from "react"
import { Globe, MapPin, Star } from "lucide-react";

export default function UniversityCard({ university }) {
  return (
    <div className="bg-neutral-dark text-neutral-white rounded-xl p-4 shadow-lg hover:scale-105 transition duration-300 w-full max-w-sm flex flex-col ">

   
      <div className="flex flex-col gap-1">


  <h2 className="text-lg font-bold text-neutral-white">
    {university.name}
  </h2>


  <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-mid">
     <img
    src={university.logo || "https://via.placeholder.com/50"}
    alt={university.name}
    className="w-12 h-12 rounded-full object-cover"
  />

    
    <div className="flex items-center gap-1">
      <MapPin size={14} />
      <span>{university.location}</span>


</div>
    </div>

   
    {university.address && (
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          university.address
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-yellow hover:underline hover:text-neutral-yellow transition text-sm"
      >
        {university.address}
      </a>
    )}

  </div>

      <p className="text-neutral-mid text-sm mt-3 line-clamp-3">
        {university.description}
      </p>

   
      <div className="mt-4 flex justify-between text-sm">

      

        <div className="flex items-center gap-1 text-neutral-yellow">
          <Star size={16} />
          {university.averageRating}
        </div>

      </div>

  
      <button className="mt-4 w-48 bg-accent-blue hover:bg-button transition py-2 rounded-lg">
        Voir détails
      </button>

    </div>
  );
}
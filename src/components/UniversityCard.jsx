import React from "react";
import { Globe, MapPin, Star } from "lucide-react";

export default function UniversityCard({ university }) {
  return (
    <div className="bg-[#111827] text-white rounded-xl p-4 shadow-lg hover:scale-105 transition duration-300 w-full max-w-sm flex flex-col ">

   
      <div className="flex flex-col gap-1">


  <h2 className="text-lg font-bold text-white">
    {university.name}
  </h2>


  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
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
        className="text-[#FDE047] hover:underline hover:text-yellow-300 transition text-sm"
      >
        {university.address}
      </a>
    )}

  </div>

      <p className="text-gray-400 text-sm mt-3 line-clamp-3">
        {university.description}
      </p>

   
      <div className="mt-4 flex justify-between text-sm">

      

        <div className="flex items-center gap-1 text-[#FDE047]">
          <Star size={16} />
          {university.averageRating}
        </div>

      </div>

  
      <button className="mt-4 w-48 bg-[#2563EB] hover:bg-[#1E40AF] transition py-2 rounded-lg">
        Voir détails
      </button>

    </div>
  );
}
import React from "react";
import UniversityCard from "../components/UniversityCard";

const universities = [
  {
    id: 1,
    name: "HEI Madagascar",
    location: "Antananarivo",
    description: "Haute École d'Informatique de Madagascar",
    tuitionRangeMin: 500000,
    tuitionRangeMax: 2000000,
    averageRating: 4.5,
    logo: "https://via.placeholder.com/50",
    address: "II J 161 R Ambodivoanjo Ivandry Antananarivo, 101",
    field: "Informatique"
  },
  {
    id: 2,
    name: "ISPM",
    location: "Antananarivo",
    description: "Institut Supérieur Polytechnique de Madagascar",
    tuitionRangeMin: 300000,
    tuitionRangeMax: 1500000,
    averageRating: 4.2,
    logo: "https://via.placeholder.com/50",
    address: "3HM8+CQH, Antananarivo",
    field: "Ingénierie"
  },
  {
    id: 3,
    name: "Université d’Antananarivo",
    location: "Antananarivo",
    description: "Université publique principale de Madagascar",
    tuitionRangeMin: 100000,
    tuitionRangeMax: 500000,
    averageRating: 4.0,
    logo: "https://via.placeholder.com/50",
    address: "Ankatso, Antananarivo",
    field: "Général"
  },
  {
    id: 4,
    name: "INSCAE",
    location: "Antananarivo",
    description: "Institut National des Sciences Comptables et Administration",
    tuitionRangeMin: 600000,
    tuitionRangeMax: 2500000,
    averageRating: 4.6,
    logo: "https://via.placeholder.com/50",
    address: "Route d'Andoharanofotsy, Antananarivo",
    field: "Gestion / Finance"
  },
  {
    id: 5,
    name: "CNTEMAD",
    location: "Antananarivo",
    description: "Centre National de Télé-Enseignement de Madagascar",
    tuitionRangeMin: 150000,
    tuitionRangeMax: 800000,
    averageRating: 3.8,
    logo: "https://via.placeholder.com/50",
    address: "Ankatso, Antananarivo",
    field: "Distance Learning"
  },
  {
    id: 6,
    name: "Université de Fianarantsoa",
    location: "Fianarantsoa",
    description: "Université publique régionale",
    tuitionRangeMin: 100000,
    tuitionRangeMax: 400000,
    averageRating: 3.9,
    logo: "https://via.placeholder.com/50",
    address: "Fianarantsoa centre",
    field: "Général"
  },
  {
    id: 7,
    name: "Université de Toamasina",
    location: "Toamasina",
    description: "Université publique de l'Est de Madagascar",
    tuitionRangeMin: 120000,
    tuitionRangeMax: 500000,
    averageRating: 3.8,
    logo: "https://via.placeholder.com/50",
    address: "Toamasina II",
    field: "Général"
  },
  {
    id: 8,
    name: "Université de Mahajanga",
    location: "Mahajanga",
    description: "Université publique de la région Boeny",
    tuitionRangeMin: 100000,
    tuitionRangeMax: 450000,
    averageRating: 3.7,
    logo: "https://via.placeholder.com/50",
    address: "Mahajanga centre",
    field: "Général"
  },
  {
    id: 9,
    name: "Université de Toliara",
    location: "Toliara",
    description: "Université publique du sud-ouest",
    tuitionRangeMin: 100000,
    tuitionRangeMax: 400000,
    averageRating: 3.6,
    logo: "https://via.placeholder.com/50",
    address: "Toliara I",
    field: "Général"
  },
  {
    id: 10,
    name: "ESPA Vontovorona",
    location: "Antananarivo",
    description: "École Supérieure Polytechnique d’Antananarivo",
    tuitionRangeMin: 400000,
    tuitionRangeMax: 1800000,
    averageRating: 4.3,
    logo: "https://via.placeholder.com/50",
    address: "Vontovorona",
    field: "Ingénierie"
  },
  {
    id: 11,
    name: "ISCAM",
    location: "Antananarivo",
    description: "Institut Supérieur de la Communication et Management",
    tuitionRangeMin: 700000,
    tuitionRangeMax: 3000000,
    averageRating: 4.4,
    logo: "https://via.placeholder.com/50",
    address: "Ankorondrano, Antananarivo",
    field: "Marketing / Communication"
  },
  {
    id: 12,
    name: "E-Media",
    location: "Antananarivo",
    description: "École des métiers du digital et multimédia",
    tuitionRangeMin: 800000,
    tuitionRangeMax: 3500000,
    averageRating: 4.5,
    logo: "https://via.placeholder.com/50",
    address: "Andraharo, Antananarivo",
    field: "Digital / Design"
  },
  {
    id: 13,
    name: "Faculté de Médecine Ankatso",
    location: "Antananarivo",
    description: "Formation en médecine et sciences de la santé",
    tuitionRangeMin: 200000,
    tuitionRangeMax: 1000000,
    averageRating: 4.2,
    logo: "https://via.placeholder.com/50",
    address: "CHU Ankatso",
    field: "Médecine"
  },
  {
    id: 14,
    name: "CNTEMAD Antsiranana",
    location: "Antsiranana",
    description: "Centre de formation à distance du Nord",
    tuitionRangeMin: 120000,
    tuitionRangeMax: 600000,
    averageRating: 3.9,
    logo: "https://via.placeholder.com/50",
    address: "Antsiranana centre",
    field: "Distance Learning"
  }
];

export default function UniversitiesPage() {
  return (
 <div className="overflow-x-hidden min-h-screen bg-[var(--color-neutral-dark)]/90 pt-24 md:pt-28 px-4 md:px-6  max-w-full">

  <div className="flex flex-col items-center justify-center text-center mb-10">
    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
      <span className="bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#e7e4d6] text-transparent bg-clip-text">
        Trouve Ton Avenir Universitaire
      </span>
    </h1>

    <p className="mt-4 text-gray-400 text-sm md:text-lg max-w-2xl">
      Explore, compare et choisis l’université qui correspond à ton parcours.
    </p>
  </div>

  <div className="grid md:grid-cols-4 gap-5 justify-items-center w-full max-w-7xl mx-auto">
    {universities.slice(0, 4).map((uni) => (
  <UniversityCard key={uni.id} university={uni} />
))}
  </div>

</div>
  );
}
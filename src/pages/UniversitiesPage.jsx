import React, { useState } from "react";
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
    field: "Informatique",
    foundedYear: 2015,
    accredited: true,
    programs: ["Informatique", "Génie Logiciel", "Data Science", "Cybersécurité"],
    careers: ["Software Engineer", "DevOps Engineer", "Data Analyst", "Cybersecurity Analyst"]
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
    field: "Ingénierie",
    foundedYear: 2000,
    accredited: true,
    programs: ["Électronique", "Mécanique", "Télécommunications", "IA"],
    careers: ["Ingénieur", "Technicien", "Research Engineer"]
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
    field: "Général",
    foundedYear: 1961,
    accredited: true,
    programs: ["Droit", "Économie", "Sciences", "Lettres"],
    careers: ["Juriste", "Économiste", "Enseignant", "Administrateur"]
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
    field: "Gestion / Finance",
    foundedYear: 1986,
    accredited: true,
    programs: ["Comptabilité", "Finance", "Audit", "Management"],
    careers: ["Expert-comptable", "Auditeur", "Financial Analyst", "Manager"]
  },
  {
    id: 5,
    name: "E-Media Madagascar",
    location: "Antananarivo",
    description: "École des métiers du digital et multimédia",
    tuitionRangeMin: 800000,
    tuitionRangeMax: 3500000,
    averageRating: 4.5,
    logo: "https://via.placeholder.com/50",
    address: "Andraharo, Antananarivo",
    field: "Digital / Design",
    foundedYear: 2018,
    accredited: true,
    programs: ["Design Graphique", "UI/UX", "Audiovisuel", "Marketing Digital"],
    careers: ["UI Designer", "Graphic Designer", "Content Creator", "Digital Marketer"]
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
    field: "Général",
    foundedYear: 1977,
    accredited: true,
    programs: ["Droit", "Sciences Sociales", "Économie", "Biologie"],
    careers: ["Avocat", "Chercheur", "Enseignant", "Administrateur"]
  },
  {
    id: 7,
    name: "ESPA Vontovorona",
    location: "Antananarivo",
    description: "École Supérieure Polytechnique d’Antananarivo",
    tuitionRangeMin: 400000,
    tuitionRangeMax: 1800000,
    averageRating: 4.3,
    logo: "https://via.placeholder.com/50",
    address: "Vontovorona",
    field: "Ingénierie",
    foundedYear: 1983,
    accredited: true,
    programs: ["Génie Civil", "Énergie", "Mécanique", "Informatique Industrielle"],
    careers: ["Ingénieur Civil", "Ingénieur Énergie", "Chef de projet", "Technicien"]
  }
];

export default function UniversitiesPage() {
  const [selected, setSelected] = useState(null);

  const uni = selected;

  return (
    <div className="min-h-screen bg-[var(--color-neutral-dark)]/95 pt-24 px-4 overflow-x-hidden">

      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-indigo-500 to-yellow-300 text-transparent bg-clip-text">
          Trouve Ton Avenir Universitaire
        </h1>
        <p className="text-gray-400 mt-3">
          Explore les meilleures universités de Madagascar
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {universities.map((u) => (
          <div key={u.id} onClick={() => setSelected(u)}>
            <UniversityCard university={u} />
          </div>
        ))}
      </div>

      <div className={`fixed inset-0 bg-black/60 backdrop-blur-md items-center justify-center p-4 z-50 ${uni ? "flex" : "hidden"}`}>

        <div className="w-full max-w-4xl rounded-3xl overflow-hidden bg-[#0f172a] border border-white/10 shadow-2xl">

          <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-neutral-white">

            <img src={uni?.logo} className="w-14 h-14 rounded-xl bg-white p-1" />

            <div>
              <h2 className="text-white text-xl font-bold">{uni?.name}</h2>
              <p className="text-white/80 text-sm">{uni?.field}</p>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="ml-auto text-white text-3xl hover:scale-110"
            >
              ×
            </button>

          </div>

          <div className="p-6 text-white space-y-6">

            <p className="text-gray-300">{uni?.description}</p>

            <div className="grid md:grid-cols-2 gap-4 text-sm">

              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">

                <p>Année : <span className="text-white ml-2">{uni?.foundedYear}</span></p>

                <p>
                  Statut :
                  <span className={uni?.accredited ? "text-green-400 ml-2" : "text-red-400 ml-2"}>
                    {uni?.accredited ? "Agréé" : "Non agréé"}
                  </span>
                </p>

                <p>
                  Frais :
                  <span className="text-white ml-2">
                    {uni?.tuitionRangeMin} - {uni?.tuitionRangeMax}
                  </span>
                </p>

              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">

                <p className="text-gray-400 mb-2">Adresse</p>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(uni?.address || "")}`}
                  target="_blank"
                  className="text-blue-400 hover:underline"
                >
                  {uni?.address}
                </a>

              </div>

            </div>

           <div>
  <h3 className="text-sm text-gray-400 mb-2">Filières / Compétences</h3>
  <div className="flex flex-wrap gap-2">
    {uni?.programs?.map((s, i) => (
      <span
        key={i}
        className="px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-200"
      >
        {s}
      </span>
    ))}
  </div>

  <div className="grid md:grid-cols-4 gap-5 justify-items-center w-full max-w-7xl mx-auto">
    {universities.slice(0, 8).map((uni) => (
  <UniversityCard key={uni.id} university={uni} />
))}
  </div>

</div>

<div>
  <h3 className="text-sm text-gray-400 mb-2 mt-4">Carrières associées</h3>
  <div className="flex flex-wrap gap-2">
    {uni?.careers?.map((c, i) => (
      <span
        key={i}
        className="px-3 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-200"
      >
        {c}
      </span>
    ))}
  </div>
</div>

          </div>

        </div>
      </div>

    </div>
  );
}
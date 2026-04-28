import React, { useState } from "react";
import UniversityCard from "../components/UniversityCard";

const universities = [
  {
    id: 1,
    name: "HEI Madagascar",
    location: "Antananarivo",
    description: "Haute École d'Informatique de Madagascar, spécialisée dans les technologies modernes et l'innovation numérique.",
    tuitionRangeMin: 500000,
    tuitionRangeMax: 2000000,
    averageRating: 4.5,
    logo: "https://via.placeholder.com/50",
    address: "II J 161 R Ambodivoanjo Ivandry Antananarivo, 101",
    field: "Informatique",
    foundedYear: 2015,
    accredited: true,
    programs: ["Informatique", "Génie Logiciel", "Data Science", "Cybersécurité", "Intelligence Artificielle"],
    careers: ["Software Engineer", "DevOps Engineer", "Data Analyst", "Cybersecurity Analyst", "AI Engineer"]
  },

  {
    id: 2,
    name: "ISPM",
    location: "Antananarivo",
    description: "Institut Supérieur Polytechnique de Madagascar formant des ingénieurs polyvalents.",
    tuitionRangeMin: 300000,
    tuitionRangeMax: 1500000,
    averageRating: 4.2,
    logo: "https://via.placeholder.com/50",
    address: "3HM8+CQH, Antananarivo",
    field: "Ingénierie",
    foundedYear: 2000,
    accredited: true,
    programs: ["Génie Électrique", "Mécanique", "Télécommunications", "Énergie", "Robotique"],
    careers: ["Ingénieur Électrique", "Ingénieur Mécanique", "Technicien Supérieur", "Research Engineer"]
  },

  {
    id: 3,
    name: "Université d’Antananarivo",
    location: "Antananarivo",
    description: "Plus grande université publique de Madagascar avec plusieurs facultés pluridisciplinaires.",
    tuitionRangeMin: 100000,
    tuitionRangeMax: 500000,
    averageRating: 4.0,
    logo: "https://via.placeholder.com/50",
    address: "Ankatso, Antananarivo",
    field: "Général",
    foundedYear: 1961,
    accredited: true,
    programs: ["Droit", "Économie", "Médecine", "Sciences", "Lettres Modernes", "Sociologie"],
    careers: ["Juriste", "Médecin", "Économiste", "Enseignant", "Administrateur Public"]
  },

  {
    id: 4,
    name: "INSCAE",
    location: "Antananarivo",
    description: "École supérieure spécialisée en gestion, finance et administration des entreprises.",
    tuitionRangeMin: 600000,
    tuitionRangeMax: 2500000,
    averageRating: 4.6,
    logo: "https://via.placeholder.com/50",
    address: "Route d'Andoharanofotsy, Antananarivo",
    field: "Gestion / Finance",
    foundedYear: 1986,
    accredited: true,
    programs: ["Comptabilité", "Finance", "Audit", "Management", "Entrepreneuriat"],
    careers: ["Expert-Comptable", "Auditeur", "Financial Analyst", "Manager", "Consultant"]
  },

  {
    id: 5,
    name: "E-Media Madagascar",
    location: "Antananarivo",
    description: "École spécialisée dans le digital, la création et les métiers du multimédia.",
    tuitionRangeMin: 800000,
    tuitionRangeMax: 3500000,
    averageRating: 4.5,
    logo: "https://via.placeholder.com/50",
    address: "Andraharo, Antananarivo",
    field: "Digital / Design",
    foundedYear: 2018,
    accredited: true,
    programs: ["Design Graphique", "UI/UX Design", "Audiovisuel", "Marketing Digital", "Motion Design"],
    careers: ["UI Designer", "Graphic Designer", "Video Editor", "Content Creator", "Digital Marketer"]
  },

  {
    id: 6,
    name: "Université de Fianarantsoa",
    location: "Fianarantsoa",
    description: "Université publique régionale offrant plusieurs formations académiques.",
    tuitionRangeMin: 100000,
    tuitionRangeMax: 400000,
    averageRating: 3.9,
    logo: "https://via.placeholder.com/50",
    address: "Fianarantsoa centre",
    field: "Général",
    foundedYear: 1977,
    accredited: true,
    programs: ["Droit", "Sciences Sociales", "Économie", "Biologie", "Histoire"],
    careers: ["Avocat", "Chercheur", "Enseignant", "Administrateur", "Analyste Social"]
  },

  {
    id: 7,
    name: "ESPA Vontovorona",
    location: "Antananarivo",
    description: "École d’ingénierie spécialisée dans les sciences appliquées et industrielles.",
    tuitionRangeMin: 400000,
    tuitionRangeMax: 1800000,
    averageRating: 4.3,
    logo: "https://via.placeholder.com/50",
    address: "Vontovorona",
    field: "Ingénierie",
    foundedYear: 1983,
    accredited: true,
    programs: ["Génie Civil", "Énergie", "Mécanique Industrielle", "Informatique Industrielle", "BTP"],
    careers: ["Ingénieur Civil", "Chef de Projet", "Ingénieur Énergie", "Technicien BTP"]
  },

  {
    id: 8,
    name: "CNTEMAD",
    location: "Antananarivo",
    description: "Centre national d’enseignement à distance de Madagascar.",
    tuitionRangeMin: 150000,
    tuitionRangeMax: 800000,
    averageRating: 3.8,
    logo: "https://via.placeholder.com/50",
    address: "Ankatso, Antananarivo",
    field: "Distance Learning",
    foundedYear: 1992,
    accredited: true,
    programs: ["Droit", "Gestion", "Économie", "Informatique", "Sciences Sociales"],
    careers: ["Juriste", "Gestionnaire", "Comptable", "Administrateur", "Analyste"]
  }
];

export default function UniversitiesPage() {
  const [selected, setSelected] = useState(null);

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

      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-md items-center justify-center p-4 z-50 ${
          selected ? "flex" : "hidden"
        }`}
      >

        <div className="w-full max-w-4xl rounded-3xl overflow-hidden bg-[#0f172a] border border-white/10 shadow-2xl">

          <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-800">

            <img
              src={selected?.logo}
              className="w-14 h-14 rounded-xl bg-white p-1"
              alt=""
            />

            <div>
              <h2 className="text-white text-xl font-bold">
                {selected?.name}
              </h2>
              <p className="text-white/80 text-sm">
                {selected?.field}
              </p>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="ml-auto text-white text-3xl hover:scale-110 transition"
            >
              ×
            </button>

          </div>

          <div className="p-6 text-white space-y-6">

            <p className="text-gray-300">
              {selected?.description}
            </p>

            <div className="grid md:grid-cols-2 gap-4 text-sm">

              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">

                <p>
                  Année :
                  <span className="text-white ml-2">
                    {selected?.foundedYear}
                  </span>
                </p>

                <p>
                  Statut :
                  <span className={selected?.accredited ? "text-green-400 ml-2" : "text-red-400 ml-2"}>
                    {selected?.accredited ? "Agréé" : "Non agréé"}
                  </span>
                </p>

                <p>
                  Frais :
                  <span className="text-white ml-2">
                    {selected?.tuitionRangeMin} - {selected?.tuitionRangeMax}
                  </span>
                </p>

              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">

                <p className="text-gray-400 mb-2">Adresse</p>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    selected?.address || ""
                  )}`}
                  target="_blank"
                  className="text-blue-400 hover:underline"
                >
                  {selected?.address}
                </a>

              </div>

            </div>

            <div>
              <h3 className="text-sm text-gray-400 mb-2">
                Filières / Programmes
              </h3>
              <div className="flex flex-wrap gap-2">
                {selected?.programs?.map((p, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-200"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm text-gray-400 mb-2 mt-4">
                Carrières associées
              </h3>
              <div className="flex flex-wrap gap-2">
                {selected?.careers?.map((c, i) => (
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
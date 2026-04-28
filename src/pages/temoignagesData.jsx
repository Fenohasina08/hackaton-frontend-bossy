const Temoignages = () => {
  const temoignagesData = [
    {
      id: 1,
      name: "Andry R.",
      role: "Étudiant en informatique",
      message:
        "Grâce à cette plateforme, j’ai pu découvrir des universités que je ne connaissais même pas. Ça m’a vraiment aidé à choisir mon orientation.",
    },
    {
      id: 2,
      name: "Miora L.",
      role: "Étudiante en gestion",
      message:
        "Très simple à utiliser et super utile pour comparer les formations. J’ai gagné beaucoup de temps dans mes recherches.",
    },
    {
      id: 3,
      name: "Tojo A.",
      role: "Bachelier",
      message:
        "J’étais perdu après le bac, mais ce site m’a guidé vers les bonnes filières. Maintenant j’ai un objectif clair.",
    },
    {
      id: 4,
      name: "Fanja S.",
      role: "Étudiante en design",
      message:
        "J’adore l’interface et les informations sont très claires. C’est exactement ce qu’il me fallait pour avancer.",
    },
    {
      id: 5,
      name: "Hery K.",
      role: "Étudiant en économie",
      message:
        "Une excellente plateforme pour découvrir des opportunités d’études. Je la recommande à tous les lycéens.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">
        Témoignages
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {temoignagesData.map((t) => (
          <div
            key={t.id}
            className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition"
          >
            <p className="text-gray-300 italic">"{t.message}"</p>

            <div className="mt-4">
              <h3 className="font-bold">{t.name}</h3>
              <p className="text-sm text-gray-400">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Temoignages;
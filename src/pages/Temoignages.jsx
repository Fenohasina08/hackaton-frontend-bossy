const Temoignages = () => {
  const temoignagesData = [
    {
      id: 1,
      name: "Andry R.",
      role: "Étudiant en informatique",
      message:
        "Grâce à cette plateforme, j’ai pu découvrir des universités que je ne connaissais même pas. Ça m’a vraiment aidé à choisir mon orientation.",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: 2,
      name: "Miora L.",
      role: "Étudiante en gestion",
      message:
        "Très simple à utiliser et super utile pour comparer les formations. J’ai gagné beaucoup de temps dans mes recherches.",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 3,
      name: "Tojo A.",
      role: "Bachelier",
      message:
        "J’étais perdu après le bac, mais ce site m’a guidé vers les bonnes filières. Maintenant j’ai un objectif clair.",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 4,
      name: "Fanja S.",
      role: "Étudiante en design",
      message:
        "J’adore l’interface et les informations sont très claires. C’est exactement ce qu’il me fallait pour avancer.",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    {
      id: 5,
      name: "Lova T.",
      role: "Étudiant en commerce",
      message:
        "Une mine d’or pour trouver la formation idéale. Les filtres sont super pratiques pour affiner sa recherche.",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
    {
      id: 6,
      name: "Sarobidy N.",
      role: "Lycéenne en terminale",
      message:
        "Avant, je stressais pour mon orientation. Maintenant, j’ai une liste d’universités qui me correspondent vraiment.",
      avatar: "https://i.pravatar.cc/150?img=20",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Témoignages</h1>

      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {temoignagesData.map((t, index) => {
          // Décalage pour les deux derniers
          let extraColClass = "";
          if (index === 4) extraColClass = "md:col-start-2"; // 5ème carte -> colonne 2
          if (index === 5) extraColClass = "md:col-start-3"; // 6ème carte -> colonne 3

          return (
            <div
              key={t.id}
              className={`bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center ${extraColClass}`}
            >
              {/* Avatar avec bordure dégradée */}
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-600 p-1 shadow-lg shadow-cyan-500/20">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-full h-full rounded-full object-cover border-2 border-gray-700"
                  />
                </div>
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-800"></div>
              </div>
              <p className="text-gray-300 italic mb-4">"{t.message}"</p>
              <h3 className="font-bold text-lg text-cyan-400">{t.name}</h3>
              <p className="text-sm text-gray-400">{t.role}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Temoignages;
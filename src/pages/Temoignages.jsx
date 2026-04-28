import { useState, useEffect } from 'react';

const Temoignages = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Détecter le thème système ou stocké
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark') ||
                     (window.matchMedia('(prefers-color-scheme: dark)').matches &&
                      !localStorage.getItem('theme') === 'light');
      setIsDarkMode(isDark);
    };
    
    checkTheme();
    
    // Observer les changements de classe sur l'élément html
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  const temoignagesData = [
    {
      id: 1,
      name: "Andry R.",
      role: "Étudiant en informatique",
      message: "Grâce à cette plateforme, j'ai pu découvrir des universités que je ne connaissais même pas. Ça m'a vraiment aidé à choisir mon orientation.",
      avatar: "https://i.pravatar.cc/150?img=11",
      rating: 5
    },
    {
      id: 2,
      name: "Miora L.",
      role: "Étudiante en gestion",
      message: "Très simple à utiliser et super utile pour comparer les formations. J'ai gagné beaucoup de temps dans mes recherches.",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5
    },
    {
      id: 3,
      name: "Tojo A.",
      role: "Bachelier",
      message: "J'étais perdu après le bac, mais ce site m'a guidé vers les bonnes filières. Maintenant j'ai un objectif clair.",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 4
    },
    {
      id: 4,
      name: "Fanja S.",
      role: "Étudiante en design",
      message: "J'adore l'interface et les informations sont très claires. C'est exactement ce qu'il me fallait pour avancer.",
      avatar: "https://i.pravatar.cc/150?img=9",
      rating: 5
    },
    {
      id: 5,
      name: "Lova T.",
      role: "Étudiant en commerce",
      message: "Une mine d'or pour trouver la formation idéale. Les filtres sont super pratiques pour affiner sa recherche.",
      avatar: "https://i.pravatar.cc/150?img=15",
      rating: 5
    },
    {
      id: 6,
      name: "Sarobidy N.",
      role: "Lycéenne en terminale",
      message: "Avant, je stressais pour mon orientation. Maintenant, j'ai une liste d'universités qui me correspondent vraiment.",
      avatar: "https://i.pravatar.cc/150?img=20",
      rating: 4
    },
  ];

  // Composant étoiles
  const StarRating = ({ rating }) => (
    <div className="flex gap-1 justify-center mt-2">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen w-[80vw] bg-gray-50 dark:bg-gray-900 py-12 sm:py-16 lg:py-20 rounded-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Ce que nos{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              étudiants
            </span>{" "}
            disent
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Découvrez les expériences authentiques de ceux qui nous ont fait confiance
          </p>
        </div>

        {/* Grille des témoignages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {temoignagesData.map((t, index) => (
            <div
              key={t.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 flex flex-col h-full"
            >
              {/* En-tête de la carte */}
              <div className="flex items-start gap-4 mb-4">
                {/* Avatar avec effet de glow */}
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full rounded-full object-cover bg-gray-200 dark:bg-gray-700"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>

                {/* Infos utilisateur */}
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                    {t.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t.role}
                  </p>
                  <StarRating rating={t.rating} />
                </div>

                {/* Icône citation */}
                <svg
                  className="w-8 h-8 text-gray-300 dark:text-gray-700 opacity-50"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Message */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-1 text-center italic">
                "{t.message}"
              </p>
            </div>
          ))}
        </div>

        {/* Statistiques */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {temoignagesData.length}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Témoignages
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                1000+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Étudiants accompagnés
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                50+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Universités partenaires
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                4.8
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Note moyenne
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temoignages;
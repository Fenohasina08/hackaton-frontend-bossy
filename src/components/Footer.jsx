import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto rounded-t-3xl shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              UniGuide
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Choisis ton avenir intelligemment grâce à notre plateforme
              d'orientation universitaire.
            </p>
            <div className="flex gap-3 pt-2">
              <span className="text-sm text-gray-400">📍 Madagascar</span>
              <span className="text-gray-600">•</span>
              <span className="text-sm text-gray-400">🎓 1000+ étudiants</span>
            </div>
          </div>

          {/* Navigation Section */}
          <div>
            <h3 className="font-semibold mb-4 text-2xl relative inline-block">
              Navigation
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-yellow-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-lg">
              <li>
                <a 
                  href="/universities" 
                  className="text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-2 inline-block"
                >
                  → Universités
                </a>
              </li>
              <li>
                <a 
                  href="/quiz" 
                  className="text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-2 inline-block"
                >
                  → Quiz d'orientation
                </a>
              </li>
              <li>
                <a 
                  href="/scholarships" 
                  className="text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-2 inline-block"
                >
                  → Bourses d'études
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="font-semibold mb-4 text-2xl relative inline-block">
              Ressources
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-yellow-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-lg">
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-2 inline-block"
                >
                  → À propos
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-2 inline-block"
                >
                  → Contact
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-2 inline-block"
                >
                  → FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="font-semibold mb-4 text-2xl relative inline-block">
              Suivez-nous
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-yellow-500 rounded-full"></span>
            </h3>
            <div className="flex gap-4 mb-6">
              <a 
                href="#" 
                className="bg-gray-700 p-3 rounded-full hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="bg-gray-700 p-3 rounded-full hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="bg-gray-700 p-3 rounded-full hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                📧 <span className="text-yellow-400">contact@uniguide.mg</span>
              </p>
              <p className="text-sm text-gray-300 mt-2">
                📞 <span className="text-yellow-400">+261 34 12 345 67</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-6 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} UniGuide. Tous droits réservés.
            </div>
            
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                CGU
              </a>
            </div>

            <div className="text-gray-500 text-xs flex items-center gap-1">
              <span>✨ Fait avec passion à Madagascar</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
import React from "react";


export default function Footer() {
  return (
    <footer className="bg-accent-blue text-neutral-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">

        
        <div>
          <h2 className="text-4xl font-bold text-yellow">UniGuide</h2>
          <p className="mt-3 text-xl text-neutral-light">
            Choisis ton avenir intelligemment grâce à notre plateforme
            d’orientation universitaire.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-3xl">Navigation</h3>
          <ul className="space-y-2 text-xl">
            <li><a href="/universities" className="hover:text-yellow">Universités</a></li>
            <li><a href="/quiz" className="hover:text-yellow">Quiz</a></li>
            <li><a href="/scholarships" className="hover:text-yellow">Bourses</a></li>
          </ul>
        </div>

       
        <div>
          <h3 className="font-semibold mb-3 text-3xl">Ressources</h3>
          <ul className="space-y-2 text-xl">
            <li><a href="#" className="hover:text-yellow">À propos</a></li>
            <li><a href="#" className="hover:text-yellow">Contact</a></li>
           
          </ul>
        </div>

    
        <div>
          <h3 className="font-semibold mb-3 text-3xl">Suivez-nous</h3>

          <div className="flex gap-4">
           <svg xmlns="http://www.w3.org/2000/svg"   width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook-icon lucide-facebook" className="hover:text-yellow transition cursor-pointer"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram-icon lucide-instagram" className="hover:text-yellow transition cursor-pointe"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin-icon lucide-linkedin" className="hover:text-yellow transition cursor-pointe"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </div>

        </div>
      </div>

      <div className="border-t border-blue-300 text-center text-xl py-4">
        © {new Date().getFullYear()} UniGuide. Tous droits réservés.
      </div>
    </footer>
  );
}
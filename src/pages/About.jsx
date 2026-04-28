// src/pages/About.jsx
import { BookOpen, Users, Target, Zap } from 'lucide-react';

export default function About() {
    const cards = [
        { icon: <Target size={24} />, title: "Notre Vision", text: "Devenir le pont digital entre les aspirations académiques et la réalité du marché." },
        { icon: <Users size={24} />, title: "Notre Équipe", text: "Un groupe de passionnés dédiés à simplifier votre parcours d'orientation." },
        { icon: <BookOpen size={24} />, title: "Ressources", text: "Accès à des milliers de formations et universités vérifiées." },
        { icon: <Zap size={24} />, title: "Innovation", text: "Une interface fluide pour un accès ultra-rapide à vos données." }
    ];

    return (
        <div className="max-w-5xl mx-auto py-10 space-y-12">

            {/* En-tête avec animation d'entrée */}
            <div className="glass p-10 rounded-3xl border border-neutral-white/10 text-center space-y-4 hover:border-secondary/50 transition-all duration-500">
                <h1 className="text-4xl font-black text-white">À propos de <span className="text-secondary">Nous</span></h1>
                <p className="text-neutral-light max-w-2xl mx-auto text-lg">
                    Nous avons repensé l'orientation scolaire pour qu'elle devienne une étape sereine,
                    intuitive et pleine d'opportunités.
                </p>
            </div>

            {/* Grille animée au survol */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="group glass p-8 rounded-2xl border border-neutral-white/10 hover:-translate-y-2 hover:bg-neutral-white/5 transition-all duration-300 cursor-pointer"
                    >
                        <div className="text-secondary mb-4 group-hover:scale-110 transition-transform duration-300">
                            {card.icon}
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">{card.title}</h2>
                        <p className="text-neutral-mid leading-relaxed">{card.text}</p>
                    </div>
                ))}
            </div>
            <div className="space-y-12 mt-12">

                <div className="glass p-8 rounded-2xl border border-neutral-white/10">
                    <h3 className="text-2xl font-bold text-white mb-6">Notre Évolution</h3>
                    <div className="space-y-6 ml-2">
                        <div className="relative pl-6 border-l-2 border-secondary">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-secondary"></div>
                            <h4 className="text-white font-bold">27/04/2026 : Lancement</h4>
                            <p className="text-neutral-mid text-sm">Début de notre aventure avec une interface minimaliste.</p>
                        </div>
                        <div className="relative pl-6 border-l-2 border-secondary/30">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-secondary/30"></div>
                            <h4 className="text-white font-bold">Aujourd'hui : Présent</h4>
                            <p className="text-neutral-mid text-sm">Résultat d'une acharnement d'une équipe soudé.</p>
                        </div>
                    </div>
                </div>

                <div className="glass p-8 rounded-2xl border border-neutral-white/10">
                    <h3 className="text-2xl font-bold text-white mb-6">Questions Fréquentes</h3>
                    <div className="space-y-4">
                        <details className="group cursor-pointer p-4 hover:bg-neutral-white/5 rounded-lg transition-all">
                            <summary className="font-bold text-secondary">Est-ce gratuit ?</summary>
                            <p className="text-neutral-mid mt-2 text-sm">Oui, l'accès à l'orientation de base est totalement gratuit pour tous.</p>
                        </details>
                        <details className="group cursor-pointer p-4 hover:bg-neutral-white/5 rounded-lg transition-all">
                            <summary className="font-bold text-secondary">Comment nous contacter ?</summary>
                            <p className="text-neutral-mid mt-2 text-sm">Via la section paramètres ou par email à support@myapp.com.</p>
                        </details>
                    </div>
                </div>

            </div>

            <div className="glass p-8 rounded-2xl border border-secondary/20 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-2xl font-bold text-white">Prêt à commencer ?</h3>
                    <p className="text-neutral-light">Rejoignez la communauté et accédez à nos outils exclusifs.</p>
                </div>
                <button className="px-8 py-3 bg-secondary text-primary font-bold rounded-xl hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    Explorer maintenant
                </button>
            </div>
        </div>
    );
}
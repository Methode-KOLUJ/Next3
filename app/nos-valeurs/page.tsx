"use client"; 

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type ValueItem = {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  color: string;
};

export default function NosValeurs() {
  const [activeValue, setActiveValue] = useState<number | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  // Données des valeurs avec couleurs associées
  // Données des valeurs avec couleurs associées
  const valeurs: ValueItem[] = [
     {
      id: 4,
      title: "Respect",
      imageUrl: "/Mission/Respect.jpeg",
      description:
        "Engagés envers un avenir plus vert, nous intégrons des pratiques durables dans toutes nos opérations.",
      color: "from-rose-600/70 to-pink-700/70",
    },
     {
      id: 2,
      title: "Intégrité",
      imageUrl: "/Mission/Integ.jpeg",
      description:
        "L'excellence est au cœur de tout ce que nous faisons, avec des standards de qualité inégalés dans notre industrie.",
      color: "from-amber-600/70 to-orange-700/70",
    },
       {
      id: 3,
      title: "Responsabilité",
      imageUrl: "/Mission/Respo.jpeg",
      description:
        "Nous croyons en la force du travail d'équipe et en la création de synergies avec nos partenaires.",
      color: "from-emerald-600/70 to-teal-700/70",
    },
    {
      id: 1,
      title: "Engagement",
      imageUrl: "/Mission/Engag.jpeg",
      description:
        "Nous repoussons constamment les limites de la technologie pour offrir des solutions avant-gardistes à nos clients.",
      color: "from-purple-600/70 to-indigo-700/70",
    },
  ];


  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto min-h-screen bg-gradient-to-br from-gray-950 to-black">
      <div className=" mx-auto text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-500 mt-10 uppercase"
        >
          Nos <span className="text-3xl md:text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-gray-300 uppercase">Valeurs</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl lg:text-2xl text-gray-100 mx-auto leading-relaxed"
        >
          Sauvons l'Enfance en Difficulté (SEED) est un organisme à but non lucratif qui travaille en fonction de 4 valeurs fondamentales.
        </motion.p>
      </div>

      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {valeurs.map((valeur) => (
          <motion.div
            key={valeur.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: valeur.id * 0.1 }}
            className="relative group"
            onMouseEnter={() => setHoveredValue(valeur.id)}
            onMouseLeave={() => setHoveredValue(null)}
          >
            <div
              className={`relative h-80 rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all duration-300 ${hoveredValue === valeur.id ? "shadow-2xl" : ""}`}
              onClick={() => setActiveValue(activeValue === valeur.id ? null : valeur.id)}
            >
              {/* Image avec gradient overlay */}
              <div className="relative h-full w-full">
                <Image
                  src={valeur.imageUrl}
                  alt={valeur.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${valeur.color} opacity-80 flex flex-col items-center justify-end pb-8 px-6`}>
                  <h3 className="text-white text-3xl font-bold text-center mb-3 transition-all duration-300 group-hover:mb-6">
                    {valeur.title}
                  </h3>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: hoveredValue === valeur.id ? "80%" : "40%" }}
                    className="h-1 bg-white rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Modal animé pour la description */}
            <AnimatePresence>
              {activeValue === valeur.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70"
                  onClick={() => setActiveValue(null)}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 50 }}
                    className={`relative max-w-md w-full rounded-2xl overflow-hidden shadow-2xl bg-white ${activeValue === valeur.id ? "block" : "hidden"}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className={`h-4 w-full bg-gradient-to-r ${valeur.color}`} />
                    <div className="p-8">
                      <button
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={() => setActiveValue(null)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <h3 className="text-3xl font-bold mb-4 text-gray-800">{valeur.title}</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">{valeur.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Légende animée en bas */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="max-w-7xl mx-auto mt-16 text-center"
      >
        <p className="text-gray-500 italic">
          Cliquez sur une image pour en savoir plus
        </p>
        <div className="mt-4 flex justify-center">
          {valeurs.map((valeur) => (
            <motion.div
              key={valeur.id}
              animate={{ 
                scale: hoveredValue === valeur.id ? 1.2 : 1,
                backgroundColor: hoveredValue === valeur.id ? `var(--${valeur.color.split('-')[1]}-500)` : "#9CA3AF"
              }}
              className={`w-3 h-3 mx-1 rounded-full bg-gray-400`}
            />
          ))}
        </div>
      </motion.div>

      {/* Paragraphe ajouté */}
      <div className="mx-auto mt-10 text-center bg-gradient-to-tr from-gray-900 to-pink-900 p-6 rounded-lg">
        <p className="text-gray-300 text-lg md:text-xl lg:text-2xl">
          En dehors de ces 4 valeurs fondamentales de l'Organisation non Gouvernementale Sauvons l'Enfance en difficulté (SEED), 
          l'organisme privilégie la collaboration, le travail d'équipe et la fierté. L'organisme adopte le <span className="font-bold">CTF</span>.
        </p>
      </div>
    </section>
  );
}
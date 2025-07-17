import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
import {CheckCircle } from "lucide-react";
import TitrePage from "./TitrePage"


const services = [
  {
    icon: "💻",
    title: "Développement Web",
    description: "Création de sites modernes, performants et responsives avec Python/django, React, Tailwind, etc.",
  },

  {
    // icon: "🧠",
    icon: "🤖",
    title: "Modèle de Langage (LLM)",
    description: "Intégration d'intelligence artificielle pour la génération de contenu, agents conversationnels, RAG, etc.",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description: "Conception d'interfaces centrées utilisateur, ergonomiques et attrayantes.",
  },

  // {
  //   icon: "📦",
  //   title: "DevOps",
  //   description: "Automatisation des déploiements, gestion des infrastructures et optimisation des pipelines CI/CD.",
  // },
  
  // {
  //   icon: "📊",
  //   title: "Data Science",
  //   description: "Analyse de données, visualisation et création de modèles prédictifs avec Python.",
  // },
  // {
  //   icon: "☁️",
  //   title: "Cloud Computing",
  //   description: "Intégration et déploiement d'applications sur AWS, gestion des services cloud.",
  // },
 
];

const pointsFort = [
  "Je suis quelqu'un qui aime l'apprentissage continu",
  "Une communication claire et transparente",
  "Capacité d'apprendre de nouvelles Technologies modernes ",
  "Notions de bases en DevOps",
  "Compétence de résolution de probléme",
  "Curiosité intellectuelle"
];

export default function ServicePage() {
  return (
    <section className="bg-gradient-to-br from-white via-blue-50 to-blue-100  min-h-screen py-20 ">
      <div className="max-w-6xl mx-auto  px-6">
     
      <TitrePage titre="Mes services  " size="xl"/>
    

        <p className="text-center text-gray-600 mb-16">
          Voici ce que je peux faire pour vous 👇
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-md border border-gray-200 text-center"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-bold text-[#1727D7] mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
            Pourquoi me choisir ?
          </h2>
          <ul className="space-y-4 max-w-xl mx-auto">
            {pointsFort.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-700">
                <CheckCircle className="text-green-500 mt-1" size={20} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* <div className="text-center mt-16">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Vous avez un projet ?
          </h3>
          <Link
            to="/contact"
            className="bg-indigo-600 text-white px-6 py-3 rounded-full text-sm hover:bg-indigo-700 transition"
          >
            Discutons-en →
          </Link>
        </div> */}


      </div>
    </section>
  );
}

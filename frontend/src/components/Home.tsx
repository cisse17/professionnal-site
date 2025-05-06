
import bassirou from "../assets/bassirou.jpg"
import { Mail, LucideGithub, Linkedin, LetterText, CalendarSync, Paintbrush, Container } from 'lucide-react';
import {Link} from "react-router-dom"
import Titre from './Titre';

import imgCSS from "../assets/techno/css.png";
import imgJS from "../assets/techno/js.png";
import imgREACT from "../assets/techno/react.png";
import imgHTML from "../assets/techno/html.png";
import imgNEXT from "../assets/techno/next-js.webp";
import imgNODE from "../assets/techno/node-js.png";
import imgTYPE from "../assets/techno/typescript.svg";
import imgTAILWIND from "../assets/techno/tailwind.png";
import imgPRISMA from "../assets/techno/prisma.webp";


const skills = [
  { id: 1, name: "HTML", image: imgHTML },
  { id: 2, name: "CSS", image: imgCSS },
  { id: 3, name: "JavaScript", image: imgJS },
  { id: 4, name: "React", image: imgREACT },
  { id: 5, name: "Node.js", image: imgNODE },
  { id: 6, name: "Tailwind CSS", image: imgTAILWIND },
  { id: 7, name: "TypeScript", image: imgTYPE },
  { id: 8, name: "Next.js", image: imgNEXT },
  { id: 9, name: "Prisma", image: imgPRISMA },
];


// A propos de moi
const aboutSections = [
  {
      id: 1,
      title: "Développeur Frontend",
      description: "Je suis un développeur frontend avec une bonne expérience.",
      icon: <LetterText style={{ color : "1727D7"}}  className="scale-150" />,
  },
  {
      id: 2,
      title: "Développeur Backend",
      description: "Je maîtrise les bases du développement backend pour créer des APIs robustes.",
      icon: <CalendarSync  style={{ color : "1727D7"}} className="scale-150" />,
  },

  {
    id: 3,
    title: "Développeur DevOps",
    description: "Créer des interfaces utilisateur attrayantes et fonctionnelles est ma priorité.",
    icon: <Container style={{ color : "1727D7"}} className="scale-150" />,
},
  {
      id: 4,
      title: "Passionné par l'UI/UX",
      description: "Créer des interfaces utilisateur attrayantes et fonctionnelles est ma priorité.",
      icon: <Paintbrush style={{ color : "1727D7"}} className="scale-150" />,
  },
 
];


function Home() {

  return (
<div >

<div className="bg-gradient-to-br from-white to-blue-50 min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-6 py-12 gap-12">
  {/* Texte d'intro */}
  <section className="max-w-6xl mx-auto md:mt-10 px-6 md:w-1/2 text-center md:text-left space-y-5" data-aos="fade-right">
    <h1 className="text-4xl font-extrabold text-[#1727D7]">
      Bassirou Mbacké CISSE
    </h1>
    <h2 className="text-xl text-gray-700 font-semibold">
      Développeur Full-Stack · DevOps · LLM
    </h2>

    <div className="bg-white rounded-xl shadow-md p-6 text-gray-600">
      <p>
        Passionné par la technologie, je conçois et déploie des solutions robustes,
        intelligentes et scalables. Mon expertise couvre le développement web,
        les pipelines DevOps et l'intégration de modèles LLM.
      </p>
    </div>

    <div className="flex justify-center md:justify-start space-x-4 text-[#1727D7] text-2xl mt-4">
      <Link to=""><Mail /></Link>
      <Link to=""><LucideGithub /></Link>
      <Link to=""><Linkedin /></Link>
    </div>

    <Link
      to="mailto:bassiroucisse1711@gmail.com"
      className="inline-block mt-6 px-6 py-3 bg-[#1727D7] text-white rounded-xl shadow hover:bg-blue-800 transition duration-300"
    >
      Me contacter
    </Link>
  </section>

  {/* Photo de profil */}
  <section className=" max-w-6xl mx-auto  px-6 md:w-1/3 flex justify-center" data-aos="fade-left">
    <img
      src={bassirou}
      alt="Bassirou"
      className="w-64 h-64 md:w-80 md:h-80 object-cover border-4 shadow-xl md:mt-0 mt-10"
      style={{
        borderRadius: "47% 53% 39% 61% / 38% 34% 66% 62%",
        borderColor: "#1727D7",
      }}
    />
  </section>




</div>


  {/* Section A propos de moi */}
  <section className=" max-w-6xl mx-auto py-16 px-6 bg-white">
  <div className="text-center" data-aos="fade-up">
    <Titre titre="À propos de moi" />
    <p className="text-gray-600 mt-4 mb-12 font-serif">
      Un développeur complet avec une passion pour la technologie, le design et l’innovation.
    </p>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
    {aboutSections.map((section) => (
      <div
        key={section.id}
        className="bg-blue-50 rounded-xl shadow hover:shadow-lg p-6 transition duration-300 flex space-x-4 items-start"
        data-aos="zoom-in"
      >
        <div className="text-[#1727D7]">{section.icon}</div>
        <div>
          <h3 className="text-xl font-bold text-[#1727D7] mb-1">
            {section.title}
          </h3>
          <p className="text-gray-700 text-sm font-serif">
            {section.description}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>


{/* Section Compétences */}
<section className="max-w-6xl mx-auto py-20 px-6 bg-gray-50">
  <div className=" text-center" data-aos="fade-up">
    <Titre titre="Mon domaine de compétences" />
    <p className="text-gray-600 mt-4 mb-12 font-serif">
      Technologies que j'utilise pour construire des solutions modernes et efficaces.
    </p>
  </div>

  <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 " data-aos="zoom-in-up">
    {skills.map((skill) => (
      <div
        key={skill.id}
        className=" flex flex-col items-center bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300"
      >
        <div className="w-20 h-20 p-2 rounded-full border-2 border-[#1727D7] flex items-center justify-center bg-white">
          <img
            src={skill.image}
            alt={skill.name}
            className=" w-full h-full rounded-full object-cover"
          />
        </div>
        <span className="mt-3 text-sm font-semibold text-gray-700">{skill.name}</span>
      </div>
    ))}
  </div>
</section>



    </div>
    
  );
}

export default Home;

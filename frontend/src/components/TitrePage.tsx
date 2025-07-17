// import React from 'react'

// interface  TitrePageProps {
//     Titre : string
// }
// const TitrePage = ({Titre} : TitrePageProps) => {
//   return (
//     <div>
//       <h1> {Titre} </h1>
//     </div>
//   )
// }

// export default TitrePage


import { motion } from "framer-motion";

interface TitrePageProps {
  titre: string;
  size?: "sm" | "md" | "lg" | "xl"; // Optionnel : taille personnalisable
}

const sizeMap = {
  sm: "text-2xl",
  md: "text-3xl",
  lg: "text-4xl",
  xl: "text-5xl",
};

const TitrePage = ({ titre, size = "lg" }: TitrePageProps) => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    //   className={`font-bold text-center mt-10 mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text ${sizeMap[size]}`}
      className={`text-center mt-10 mb-8 font-extrabold text-[#1727D7] ${sizeMap[size]}`}
    >
      {titre}
    </motion.h1>
  );
};

export default TitrePage;

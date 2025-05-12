import { useState, useEffect } from "react";
import axios from "axios";
import { Github } from "lucide-react";

interface MyProjet {
  id: number;
  titre: string;
  slug: string;
  description: string;
  demolien: string;
  repolien: string;
  technologies: string[];
  image: string;
}

const Projet = () => {
  const [Projets, setProjects] = useState<MyProjet[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("");


  console.log(Projets);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/projet/")
    .then((res) => {
      setProjects(res.data);
    });
  }, []);


  const filteredProjets = Projets.filter((projet) => {
    const matchName = projet.titre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTech = selectedTech === "" || projet.technologies.some((tech) =>
      tech.toLowerCase().includes(selectedTech.toLowerCase())
    );
    return matchName && matchTech;
  });

  const uniqueTechnologies = Array.from(
    new Set(Projets.flatMap((projet) => projet.technologies))
  );


  // const [Projets, setProjects] = useState([])
  // console.log(Projets)
  // const GetData = () => {
  //   axios.get("http://127.0.0.1:8000/api/projet/")
  //   .then((res) => {
  //     setProjects(res.data)
  //   })

  // }

  // useEffect(() => {
  //   GetData()
  // }, [])

  return (

    <div className="pt-20 md:pt-24 pb-16 px-4 min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
    <div className="max-w-6xl mx-auto px-6">

      {/* Titre principal */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-blue-900">
        Mes <span className="text-blue-600">Projets</span>
      </h1>
        
      {/* Filtres */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 justify-center" data-aos="fade-down">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={selectedTech}
          onChange={(e) => setSelectedTech(e.target.value)}
          className="select select-bordered w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Filtrer par technologie</option>
          {uniqueTechnologies.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </div>

      {/* Grid de projets */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
        {filteredProjets.map((projet) => (
          <div
            key={projet.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={`http://127.0.0.1:8000${projet.image}`}
              alt={projet.titre}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-bold text-blue-800 mb-2">
                {projet.titre}
              </h2>
              <p className="text-gray-600 text-sm">{projet.description}</p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {projet.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Boutons */}
              <div className=" flex items-center justify-center mt-6 space-x-2 ">
                <a
                  href={projet.demolien}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white w-2/3 "
                >
                  Voir projet
                </a>
                <a
                  href={projet.repolien}
                  target="_blank"
                  rel="noreferrer"
                  className=" w-1/3 btn btn-sm btn-link border border-blue-600 underline-offset-0 "
                >
                  <Github className="h-5 w-4" /> Github
                </a>
              </div>
              
            </div>
          </div>
        ))}

      </div>
    </div>
  </div>



  );
};

export default Projet;

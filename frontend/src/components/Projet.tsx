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
    axios.get("http://127.0.0.1:8000/api/projet/").then((res) => {
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
    <div className="mt-20">
      <h1>Mes projets  test titre </h1>

      {/* Filtres */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />

        <select
          value={selectedTech}
          onChange={(e) => setSelectedTech(e.target.value)}
          className="select select-bordered w-full md:w-1/3"
        >
          <option value="">Toutes les technologies</option>
          {uniqueTechnologies.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </div>


      {/* affichage  card de mes projets */}
      <div className="grid md:grid-cols-3 gap-4 ml-3 mr-3">

      {filteredProjets.map((projet) => (
        <div key={projet.id} className="bg-base-100  p-5 h-fit  rounded-xl shadow-sm">
          <img src={`http://127.0.0.1:8000${projet.image}`} alt={projet.titre} className="w-full rounded-xl h-56  object-cover" />  
        
          <div className="card-body">
            <h2 className="my-2 font-bold">{projet.titre}</h2>
            <p className="text-sm"> 
              {projet.description}
            </p>

            <div className=" flex flex-wrap gap-2 my-3">
              {projet.technologies.map((tech) => (
                  <span className="badge badge-accent badge-sm">{tech}</span>
              ))}
            
            </div>

            <div className="flex space-x-3">
              <a className="btn btn-accent w-2/3" href={projet.demolien}>Demo</a>
              <a className="btn btn-neutral w-1/3" href={projet.repolien}>

                <Github className="w-4"/> 
                </a>
            </div>

          </div>
       
        </div>
      ))}

      </div>
      
      
    </div>
  );
};

export default Projet;

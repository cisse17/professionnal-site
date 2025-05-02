import { useEffect, useState } from 'react';
import axios from 'axios';
import bassirou from "../assets/bassirou.jpg"
import { Mail, LucideGithub, Linkedin, Divide } from 'lucide-react';
import {Link} from "react-router-dom"
interface Projet {
  id: number;
  titre: string;
  slug: string;
  description: string;
  demolien: string;
  repolien: string;
  technologies: string;
  image: string;
}
function Home() {
  // const [projets, setProjets] =  useState<Projet[]>([]);

  // useEffect(() => {
  //   axios.get('http://127.0.0.1:8000/api/projet/')
  //     .then(res => {
  //       setProjets(res.data);
  //     })
  //     .catch(err => {
  //       console.error('Erreur de chargement', err);
  //     });
  // }, []);

  return (
    <div>
    <div className="bg-gray-50 flex flex-col-reverse md:flex-row m-auto">
    
        <section className="mt-0 md:mt-15 m-auto flex flex-col items-center space-y-4 ">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Bassirou Mbacké CISSE</h1>
          </div>
          <h2 className="text-xl text-primary text-center">
            Développeur Full-Stack · DevOps · LLM Enthusiast
          </h2>
    
          <div className="w-full max-w-xl bg-base-200 shadow-lg">
            <div className="card-body text-center text-lg font-serif">
              <p>
                Passionné par la technologie, je conçois et déploie des solutions robustes,
                intelligentes et scalables. Mon expertise couvre le développement web,
                les pipelines DevOps et l'intégration de modèles LLM pour créer des
                produits modernes et performants.
              </p>
            </div>
          </div>
    
          <div className="flex space-x-6 text-3xl mt-5">
           <Link to={""} > <Mail /> </Link> 
           <Link to={""} > <LucideGithub/> </Link> 
           <Link to={""} > <Linkedin/> </Link> 
            
          </div>
    
          <Link to="mailto:bassiroucisse1711@gmail.com" className="btn btn-primary btn-wide text-lg mt-4">
            Me contacter
          </Link>
        </section>

        <section className='m-auto mt-15 mb-5 flex justify-center md:ml-1'>
          <img src={bassirou} alt='' className='w-96 h-96  object-cover border-5 shadow-xl '
          style= {{
            borderRadius : "47% 53% 39% 61% / 38% 34% 66% 62% ", 
            borderColor: "1727D7" 
          }}
          />
        </section>
        
      {/* "truncate text-sm text-gray-500  */}
    </div>

    <div>
      qfgbzzfeh <br></br>
      qfgbzzfeh <br></br>
      qfgbzzfeh <br></br>
      qfgbzzfeh <br></br>
      qfgbzzfeh <br></br>
      qfgbzzfeh <br></br>
    </div>
    </div>
    
  );
}

export default Home;

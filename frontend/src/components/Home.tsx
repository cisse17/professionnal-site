
import bassirou from "../assets/bassirou.jpg"
import { Mail, LucideGithub, Linkedin, LetterText, CalendarSync, Paintbrush, Container } from 'lucide-react';
import {Link} from "react-router-dom"
import Titre from './Titre';


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
    <div className="bg-gray-50 flex flex-col-reverse md:flex-row m-auto ">
    
        <section className="mt-0 md:mt-15 m-auto flex flex-col items-center space-y-4 ">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Bassirou Mbacké CISSE</h1>
          </div>
          <h2 className="text-xl text-primary text-center">
            Développeur Full-Stack · DevOps · LLM
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
    
          <Link to="mailto:bassiroucisse1711@gmail.com" className=" btn btn-primary btn-wide text-lg mt-4 mb-10">
            Me contacter
          </Link>
        </section>

        <section className='m-auto mt-15 mb-20 flex justify-center md:ml-1'>
          <img src={bassirou} alt='' className=' w-90 h-90 md:w-96 md:h-96  object-cover border-5 shadow-xl '
          style= {{
            borderRadius : "47% 53% 39% 61% / 38% 34% 66% 62% ", 
            borderColor: "1727D7" 
          }}
          />
        </section>
        
      {/* "truncate text-sm text-gray-500  */}
    </div>

    {/* section A propos  */}
      <div >
        <h1 className='text-2xl text-center py-4 font-bold font-serif mt-10'>
         <Titre titre='A propos de moi'/>
        </h1> 
      </div>
      
      <div className=" md:h-screen flex justify-center items-center  md:space-x-30 ">   
        <div className="hidden md:block">
          <img className="w-96 h-100 object-cover rounded-xl" src={bassirou} alt="" />

        </div>

        <div >
          {aboutSections.map((Section) => (
            <div key={Section.id} className="flex flex-col  bg-base-100 mb-3 md:flex-row space-x-4 text-sm p-5 shadow-xl "> 

              <div className="mb-2 md:mb-0  flex justify-center items-center"> 
                {Section.icon}
              </div>

              <div className=" text-center md:text-left"> 
                <h2 className=" text-2xl  font-bold">
                  {Section.title}
                </h2>

                <p className="text-sm font-serif">
                  {Section.description}
                </p>
                
              </div>

            </div>
          ))}

        </div>

      </div>




    </div>
    
  );
}

export default Home;

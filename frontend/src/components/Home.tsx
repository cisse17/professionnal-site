import { useEffect, useState } from 'react';
import axios from 'axios';

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
   <div className="bg-gray-50 ">
    hello <br></br>
    sjfbkzejlo <br></br>
    fzekjbhlo <br></br>
    zfzhjblo <br></br>
    qdzgelo <br></br>


   </div>
  );
}

export default Home;

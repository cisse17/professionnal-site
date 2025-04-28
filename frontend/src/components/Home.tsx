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
  const [projets, setProjets] =  useState<Projet[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/projet/')
      .then(res => {
        setProjets(res.data);
      })
      .catch(err => {
        console.error('Erreur de chargement', err);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Projets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projets.map((projet) => (
          <div key={projet.id} className="border p-4 rounded shadow">
            <img src={`http://127.0.0.1:8000${projet.image}`} alt={projet.titre} className="w-full h-48 object-cover mb-2" />
            <h2 className="text-xl font-semibold">{projet.titre}</h2>
            <p className="text-gray-600">{projet.description}</p>
            <div className="flex gap-2 mt-2">
              <a href={projet.demolien} target="_blank" rel="noopener noreferrer" className="text-blue-500">Démo</a>
              <a href={projet.repolien} target="_blank" rel="noopener noreferrer" className="text-green-500">Repo</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

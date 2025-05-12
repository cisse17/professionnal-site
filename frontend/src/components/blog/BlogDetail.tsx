import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Article {
  id: number;
  auteur: string;
  titre: string;
  slug: string;
  content: string;
  date: string;
  categorie: string;
  video: string | null;
  image: string;
}

const BlogDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/blog/${slug}`)
      .then((res) => setArticle(res.data))
      .catch((err) => {
        console.error("Erreur lors du chargement de l'article :", err);
        setError("Article introuvable ou une erreur est survenue.");
      });
  }, [slug]);

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 font-semibold">
        {error}
        <br />
        <Link to="/blog" className="text-blue-600 underline">
          Retour au blog
        </Link>
      </div>
    );
  }

  if (!article) {
    return <div className="text-center py-20">Chargement de l'article...</div>;
  }

  return (
    <section className="bg-white py-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="text-blue-600 mb-6 inline-block hover:underline">
          ← Retour aux articles
        </Link>

        <h1 className="text-4xl font-bold text-[#1727D7] mb-4">{article.titre}</h1>

        <p className="text-sm text-gray-500 mb-6 italic">
          Publié par <strong>{article.auteur}</strong> le{" "}
          {new Date(article.date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          | Catégorie : <span className="font-medium">{article.categorie}</span>
        </p>

        {article.image && (
          <img
            src={`http://127.0.0.1:8000${article.image}`}
            alt={article.titre}
            className="w-full rounded-xl mb-8 object-cover h-80"
          />
        )}

        {article.video && (
          <video
            controls
            className="w-full h-150 object-cover mb-8 rounded-lg shadow-md"
            src={`http://127.0.0.1:8000${article.video}`}
          >
            Votre navigateur ne prend pas en charge la lecture de vidéos.
          </video>
        )}

        <div className="prose max-w-none text-gray-800 leading-relaxed">{article.content}</div>
      </div>
    </section>
  );
};

export default BlogDetail;

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TitrePage from "../TitrePage";

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
  likes: number;
}

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categorie, setCategorie] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [visibleRecentCount, setVisibleRecentCount] = useState<number>(4);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [likedArticles, setLikedArticles] = useState<{ [key: number]: boolean }>({});
  const [likeMessages, setLikeMessages] = useState<{ [key: number]: boolean }>({});


  const loadLikedFromStorage = () => {
    const stored = localStorage.getItem("liked_articles");
    return stored ? JSON.parse(stored) : {};
  };

  const saveLiked = (id: number) => {
    const updated = { ...likedArticles, [id]: true };
    setLikedArticles(updated);
    localStorage.setItem("liked_articles", JSON.stringify(updated));
  };

  const fetchArticles = useCallback(() => {
    const params: Record<string, string> = {};
    if (categorie) params.categorie = categorie;
    if (search) params.search = search;

    axios
      .get("http://127.0.0.1:8000/api/blog/", { params })
      .then((res) => {
        setArticles(res.data);
        setLikes(() => {
          const initialLikes: { [key: number]: number } = {};
          res.data.forEach((article: Article) => {
            initialLikes[article.id] = article.likes;
          });
          return initialLikes;
        });
        setError(null);
      })
      .catch(() => {
        setError("Erreur de chargement des articles.");
        setArticles([]);
      });
  }, [categorie, search]);

  useEffect(() => {
    fetchArticles();
    setLikedArticles(loadLikedFromStorage());
  }, [fetchArticles]);

  const handleLike = async (id: number) => {
    if (likedArticles[id]) return;
    try {
      const res = await axios.post(`http://127.0.0.1:8000/api/blog/${id}/like/`);
      setLikes((prev) => ({
        ...prev,
        [id]: res.data.likes,
      }));
      saveLiked(id);
      setLikeMessages((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setLikeMessages((prev) => ({ ...prev, [id]: false }));
      }, 2500);
    } catch (err) {
      console.error("Erreur lors du like :", err);
    }
  };
  

  const renderLikeButton = (articleId: number) => (
    <div className="flex items-center gap-3 mt-2">
      <button
        onClick={() => handleLike(articleId)}
        disabled={likedArticles[articleId]}
        className={`text-red-500 hover:scale-110 transition transform text-lg ${
          likedArticles[articleId] ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="J’aime"
      >
        ❤️
      </button>
      <span className="text-sm text-gray-500">{likes[articleId] || 0} j’aime</span>
      {likeMessages[articleId] && (
        <span className="text-green-600 text-xs animate-fade-in-out ml-2">Merci pour le like !</span>
      )}
    </div>
  );
  

  return (
    <section className="bg-gradient-to-br from-white via-blue-50 to-blue-100  py-16 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
       
        <TitrePage titre="Mes blog" size="xl" />

        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {["Toutes", "Tech", "Dev", "life", "Actu", "Design", "Formation"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategorie(cat === "Toutes" ? "" : cat)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition duration-200 ${
                  categorie === (cat === "Toutes" ? "" : cat)
                    ? "bg-[#1727D7] text-white"
                    : "bg-white text-[#1727D7] border-[#1727D7] hover:bg-[#1727D7]/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg px-10 py-2 w-full"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div className="space-y-6">
            {[...articles]
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200"
                >
                  {article.video ? (
                    <video
                      src={`http://127.0.0.1:8000${article.video}`}
                      controls
                      className="w-full sm:w-24 h-24 object-cover rounded-md flex-shrink-0"
                    />
                  ) : article.image ? (
                    <img
                      // src={`http://127.0.0.1:8000${article.image}`}
                      src={article.image} // vue que j'ai stocké l'image dans le storage cloudinary
                      alt={article.titre}
                      className="w-full sm:w-24 h-24 object-cover rounded-md flex-shrink-0"
                    />
                  ) : null}
                  <div className="flex-1">
                    <h3 className="text-md font-semibold text-[#1727D7] truncate">{article.titre}</h3>
                    <p className="text-sm text-gray-600 mt-1">{article.auteur}</p>
                    <p className="text-xs text-gray-400 italic">
                      Mis à jour{" "}
                      {new Date(article.date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <Link
                      to={`/blog/${article.slug}`}
                      className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                    >
                      Lire →
                    </Link>
                    {renderLikeButton(article.id)}
                  </div>
                </motion.div>
              ))}
          </div>

          <div className="space-y-10 overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-[#1727D7] border-b pb-2">Articles les plus récents</h2>

            {[...articles]
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, visibleRecentCount)
              .map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition duration-300"
                >
                  {article.video ? (
                    <video
                      // src={`http://127.0.0.1:8000${article.video}`}
                      src={article.video}
                      controls
                      className="w-full h-48 object-cover"
                    />
                  ) : article.image ? (
                    <img
                      // src={`http://127.0.0.1:8000${article.image}`}
                      src={article.image}
                      alt={article.titre}
                      className="w-full h-48 object-cover"
                    />
                  ) : null}
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-[#1727D7] mb-2">{article.titre}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.content}</p>
                    <p className="text-xs text-gray-400 italic mb-1">
                      Par {article.auteur} •{" "}
                      {new Date(article.date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <Link
                      to={`/blog/${article.slug}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Lire l'article →
                    </Link>
                    {renderLikeButton(article.id)}
                  </div>
                </motion.div>
              ))}

            {visibleRecentCount < articles.length && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setVisibleRecentCount(visibleRecentCount + 3)}
                  className="inline-block text-[#1727D7] border border-[#1727D7] px-4 py-2 rounded-lg hover:bg-[#1727D7] hover:text-white transition duration-300"
                >
                  Voir plus →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;

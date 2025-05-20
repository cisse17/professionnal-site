
// import { useState } from "react";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";

// export default function Chatbot() {
//   const [messages, setMessages] = useState([
//     { role: "assistant", content: "Bonjour 👋 Je suis le bot assistant de Bassirou Mbacké CISSE ! Posez-moi une question sur son portfolio." },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const newMessages = [...messages, { role: "user", content: input }];
//     setMessages(newMessages);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await axios.post("http://localhost:8000/api/chat/", {
//         messages: newMessages,
//       });
//       setMessages([...newMessages, res.data.reply]);
//     } catch (err) {
//       setMessages([...newMessages, { role: "assistant", content: "Désolé, une erreur est survenue." }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed bottom-4 right-4 w-80 max-h-[80vh] bg-white border border-gray-200 shadow-xl rounded-xl flex flex-col overflow-hidden">
//       <div className="bg-indigo-600 text-white p-3 text-sm font-medium">Assistant Portfolio</div>
//       <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`p-2 rounded-lg ${
//               msg.role === "user" ? "bg-gray-200 self-end" : "bg-indigo-100 text-gray-800"
//             }`}
//           >
//             {/* {msg.content} */}
//             <ReactMarkdown>{msg.content}</ReactMarkdown>
//           </div>
//         ))}
//         {loading && <div className="text-xs text-gray-400">...réponse en cours</div>}
//       </div>
//       <div className="p-2 border-t flex gap-2">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 px-2 py-1 text-sm border rounded"
//           placeholder="Posez votre question..."

//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               e.preventDefault();
//               sendMessage();
//             }
//           }}
//         />
//         <button onClick={sendMessage} className="bg-indigo-600 text-white px-3 text-sm rounded">
//           Envoyer
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { MessageCircle } from "lucide-react"; // si tu veux l'icône (sinon remplace par un svg ou texte)

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Bonjour 👋 Je suis le bot assistant de Bassirou Mbacké CISSE ! Posez-moi une question sur son portfolio." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/chat/", {
        messages: newMessages,
      });
      setMessages([...newMessages, res.data.reply]);
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "Désolé, une erreur est survenue." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Bouton flottant */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          aria-label="Ouvrir le chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Fenêtre du chat */}
      {open && (
        <div 
         data-aos="fade-up"
        className="w-80 max-h-[80vh] bg-white border border-gray-200 shadow-xl rounded-xl flex flex-col overflow-hidden animate-fade-in-up">
          <div className="bg-indigo-600 text-white p-3 flex justify-between items-center rounded-t-xl">
            <span className="font-medium text-sm">Assistant Portfolio</span>
            <button
              onClick={() => setOpen(false)}
              className="text-white text-lg font-bold hover:text-indigo-300 transition-colors"
              aria-label="Fermer le chat"
            >
              ✖
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  msg.role === "user" ? "bg-gray-200 self-end text-right" : "bg-indigo-100 text-gray-800"
                }`}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            ))}
            {loading && <div className="text-xs text-gray-400">...réponse en cours</div>}
          </div>

          <div className="p-2 border-t flex gap-2 rounded-b-xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-2 py-1 text-sm border rounded focus:outline-indigo-500"
              placeholder="Posez votre question..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              aria-label="Message à envoyer"
            />
            <button
              onClick={sendMessage}
              className="bg-indigo-600 text-white px-3 text-sm rounded hover:bg-indigo-700 transition-colors"
            >
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

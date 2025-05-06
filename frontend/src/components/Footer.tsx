import { Facebook, Twitter, Youtube } from "lucide-react";
import mon_logo from "../assets/mon_logo.svg";

const Footer = () => {
  return (
    <footer className="  bg-white border-t border-gray-200 ">
      <div className=" max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center ">
        {/* Logo et Copyright */}
        
        <aside className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <img src={mon_logo} alt="Logo" className="h-10 object-cover  mb-3 " />
          <p className="text-gray-700  text-center md:text-left">
            Copyright © {new Date().getFullYear()} - Tous droits réservés
          </p>
        </aside>

        {/* Réseaux sociaux */}
        <nav>
          <div className="grid grid-flow-col gap-6 justify-center md:justify-start">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <Twitter className="w-6 h-6  text-blue-700 " />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" transition-colors"
            >
              <Youtube className="w-6 h-6  text-blue-700 " />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition-colors"
            >
              <Facebook className="w-6 h-6 dark:text-gray-300 text-blue-700" />
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

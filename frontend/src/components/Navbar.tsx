import { Link } from "react-router-dom";
import mon_logo from "../assets/mon_logo.svg";
import { Home, FolderGit2, HandPlatter, Rss, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/home", label: "Accueil", icon: Home },
  { to: "/projets", label: "Projets", icon: FolderGit2 },
  { to: "/service", label: "Service", icon: HandPlatter },
  { to: "/blog", label: "Blog", icon: Rss },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-none shadow-sm fixed w-full z-50 ">
      <div className="flex items-center justify-between px-4 py-3 max-w-6xl mx-auto">
        <Link to="/home" className="flex items-center">
          <img src={mon_logo} alt="Logo" className="h-10 w-auto object-contain" />
        </Link>

        {/* Bouton menu mobile */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="w-6 h-6 text-[#1727D7]" />
        </button>

        {/* Menu Desktop */}
        <ul className="hidden md:flex space-x-8 font-medium text-gray-700">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <Link
                to={to}
                className="flex items-center gap-1 hover:text-[#1727D7] transition"
              >
                <Icon className="w-5 h-5 text-[#1727D7]" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Menu Mobile */}
      <div
        className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <img src={mon_logo} alt="Logo" className="h-10 w-auto" />
          <button onClick={() => setMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-md">
            <X className="w-6 h-6 text-[#1727D7]" />
          </button>
        </div>
        <ul className="flex flex-col gap-6 p-6 font-semibold text-gray-700">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <Link
                to={to}
                className="flex items-center gap-2 hover:text-[#1727D7] transition"
                onClick={() => setMenuOpen(false)}
              >
                <Icon className="w-5 h-5 text-[#1727D7]" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

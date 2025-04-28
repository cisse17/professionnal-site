import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex justify-center space-x-8">
        <li><Link to="/apropos" className="hover:text-yellow-400">À propos</Link></li>
        <li><Link to="/projets" className="hover:text-yellow-400">Projets</Link></li>
        <li><Link to="/experiences" className="hover:text-yellow-400">Expériences</Link></li>
        <li><Link to="/services" className="hover:text-yellow-400">Services</Link></li>
        <li><Link to="/" className="hover:text-yellow-400">Accueil</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

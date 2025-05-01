import { Link } from "react-router-dom";
import test1 from "../assets/test1.svg";
import test2 from "../assets/test2.svg";

const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-center md:justify-between items-center p-1 bg-base-100 border-b border-none shadow-sm sticky ">
        <Link to={"/home"} className="flex items-center ml-7">
          <img src={test1} alt="mon logo" className=" h-13 object-cover" />
          {/* <span className="font-bold text-sm">Tech et Innovation</span> */}
        </Link>
        <ul className=" hidden md:flex space-x-8  ">
          <li>
            <Link to={"/home"} className="btn btn-ghost ">Accueil</Link>
          </li>
          <li>
            <Link to={"/projet"} className="btn btn-ghost ">Projets</Link>
          </li>
          <li>
            <Link to={"/service"} className="btn btn-ghost">Service</Link>
          </li>
          <li>
            <Link to={"/blog"} className="btn btn-ghost ">Blog</Link>
          </li>
        </ul>

        {/* _____ */}

        <label className="swap swap-rotate mr-7 sm:ml-4">
          <input
            type="checkbox"
            className="theme-controller"
            value="synthwave"
          />

          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
    </nav>

    // <nav className="bg-gray-800 text-white p-4">
    //   <ul className="flex justify-center space-x-8">
    //     <li><Link to="/apropos" className="hover:text-yellow-400">À propos</Link></li>
    //     <li><Link to="/projets" className="hover:text-yellow-400">Projets</Link></li>
    //     <li><Link to="/experiences" className="hover:text-yellow-400">Expériences</Link></li>
    //     <li><Link to="/services" className="hover:text-yellow-400">Services</Link></li>
    //     <li><Link to="/" className="hover:text-yellow-400">Accueil</Link></li>
    //   </ul>
    // </nav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import mon_logo from "../assets/mon_logo.svg";
import { Home, FolderGit2, HandPlatter, Rss, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  
  return (
    

    <nav className="bg-base-100 border-b shadow-sm relative z-50">
  <div className="flex items-center justify-between p-4">
    {/* Logo toujours visible */}
    <Link to="/home" className="flex items-center">
      <img src={mon_logo} alt="Logo" className="h-10 w-auto object-contain" />
    </Link>

    {/* Bouton burger */}
    <button
      className="md:hidden btn btn-sm"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <Menu className="w-5 h-5" />
    </button>

    {/* Menu desktop */}
    <ul className="hidden md:flex space-x-6 font-semibold">
    <Link
               to={"/home"}
               className="flex items-center space-x-2 hover:underline "
             >
               <Home style={{ color: "1727D7" }} className="font-bold mr-1" />
               Accueil
      </Link>
     
    </ul>
  </div>

  {/* Menu mobile */}
  {menuOpen && (
    <div className="absolute top-0 left-0 w-full h-screen bg-base-100 flex flex-col p-6 z-40 md:hidden">
      <div className="flex justify-between items-center mb-4">
        <img src={mon_logo} alt="Logo" className="h-10 w-auto" />
        <button onClick={() => setMenuOpen(false)} className="btn btn-sm">
          <X className="w-5 h-5" />
        </button>
      </div>

      <ul className="space-y-4 font-semibold">
          <Link
                  to={"/home"}
                  className="flex items-center space-x-2 hover:underline "
                  onClick={() => setMenuOpen(false)}>
                  <Home style={{ color: "1727D7" }} className="font-bold mr-1" />
                  Accueil
          </Link>

          <Link
               to={"/projets"}

               className="flex items-center space-x-2 hover:underline "
                  onClick={() => setMenuOpen(false)}>
                  <FolderGit2 style={{ color: "1727D7" }} className="font-bold mr-1" />
                  Projets
          </Link>        
             <Link
               to={"/service"}
               className="flex items-center space-x-2 hover:underline "
               onClick={() => setMenuOpen(false)}>
               <HandPlatter style={{ color: "1727D7" }} className="font-bold mr-1" />
             Service
             </Link>     
             <Link
               to={"/blog"}
               className="flex items-center space-x-2 hover:underline "
               onClick={() => setMenuOpen(false)}>
               <Rss style={{ color: "1727D7" }} className="font-bold mr-1" />
               Blog
             </Link>     
      </ul>

    </div>
  )}
</nav>


    

    // <nav>
    //   <div className=" flex justify-center md:justify-between items-center p-1 bg-base-100 border-b border-none shadow-sm">
    //     <Link to={"/home"} className="flex items-center ml-7 ">
    //       <img src={mon_logo} alt="mon logo" className=" h-13 object-cover" />
    //     </Link>

    //     {/* boutton pour */}
    //     <button
    //       className="btn w-fit sm:hidden btn-sm"
    //       onClick={() => setMenuOpen(!menuOpen)}
    //     >
    //       <Menu className="w-4 h-4" />
    //     </button>

    //     <ul className=" hidden md:flex space-x-8  ">
    //       <li>
    //         <Link
    //           to={"/home"}
    //           className="flex justify-center items-center mt-2 font-bold hover:underline  "
    //         >
    //           <Home style={{ color: "1727D7" }} className="font-bold mr-1" />
    //           Accueil
    //         </Link>
    //       </li>
    //       <li>
    //         <Link
    //           to={"/projets"}
    //           className="flex justify-center items-center mt-2 font-bold hover:underline "
    //         >
    //           <FolderGit2
    //             style={{ color: "1727D7" }}
    //             className="font-bold mr-1"
    //           />
    //           Projets
    //         </Link>
    //       </li>
    //       <li>
    //         <Link
    //           to={"/service"}
    //           className="flex justify-center items-center mt-2 font-bold hover:underline"
    //         >
    //           <HandPlatter
    //             style={{ color: "1727D7" }}
    //             className="font-bold mr-1"
    //           />
    //           Service
    //         </Link>
    //       </li>
    //       <li>
    //         <Link
    //           to={"/blog"}
    //           className="flex justify-center items-center mt-2 font-bold hover:underline"
    //         >
    //           <Rss style={{ color: "1727D7" }} className="font-bold mr-1 " />
    //           Blog
    //         </Link>
    //       </li>
    //     </ul>

    //     <div
    //       className={`absolute top-0 w-full bg-base-100 h-screen flex flex-col gap-2 p-4 
    //       transition-all duration-300 sm:hidden z-50 ${
    //         menuOpen ? "left-0" : "-left-full"
    //       }`}
    //     >
    //         <div className="flex justify-between">
    //           <button
    //             className="btn w-fit sm:hiddenbtn-sm"
    //             onClick={() => setMenuOpen(!menuOpen)}
    //           >
    //             <X className="w-4 h-4" />
    //           </button>
    //         </div>

    //         <ul className="border border-b">
    //             <li>
    //               <Link
    //                 to={"/home"}
    //                 className="flex justify-center items-center mt-2 font-bold hover:underline  "
    //               >
    //                 <Home style={{ color: "1727D7" }} className="font-bold mr-1" />
    //                 Accueil
    //               </Link>
    //             </li>
    //             <li>
    //               <Link
    //                 to={"/projets"}
    //                 className="flex justify-center items-center mt-2 font-bold hover:underline "
    //               >
    //                 <FolderGit2
    //                   style={{ color: "1727D7" }}
    //                   className="font-bold mr-1"
    //                 />
    //                 Projets
    //               </Link>
    //             </li>
    //             <li>
    //               <Link
    //                 to={"/service"}
    //                 className="flex justify-center items-center mt-2 font-bold hover:underline"
    //               >
    //                 <HandPlatter
    //                   style={{ color: "1727D7" }}
    //                   className="font-bold mr-1"
    //                 />
    //                 Service
    //               </Link>
    //             </li>
    //             <li>
    //               <Link
    //                 to={"/blog"}
    //                 className="flex justify-center items-center mt-2 font-bold hover:underline"
    //               >
    //                 <Rss style={{ color: "1727D7" }} className="font-bold mr-1 " />
    //                 Blog
    //               </Link>
    //             </li>
    //         </ul>


    //     </div>

    //     {/* _____ */}
    //     {/* 
    //     <label className="swap swap-rotate mr-7 sm:ml-4">
    //       <input
    //         type="checkbox"
    //         className="theme-controller"
    //         value="synthwave"
    //       />

    //       <svg
    //         className="swap-off h-10 w-10 fill-current"
    //         xmlns="http://www.w3.org/2000/svg"
    //         viewBox="0 0 24 24"
    //       >
    //         <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
    //       </svg>

    //       <svg
    //         className="swap-on h-10 w-10 fill-current"
    //         xmlns="http://www.w3.org/2000/svg"
    //         viewBox="0 0 24 24"
    //       >
    //         <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
    //       </svg>
    //     </label> */}
    //   </div>
    // </nav>
  );
};

export default Navbar;

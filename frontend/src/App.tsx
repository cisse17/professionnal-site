import './App.css'
import Projet from './components/Projet'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Service from './components/Service'
import Blog from './components/Blog'
import Footer from './components/Footer'


import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";




function App() {
  
  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  return (
    <>
    <div >
      <Navbar />
    </div>
 
  
      <Routes>
      
        <Route path="/home" element={<Home />} />
        
        <Route path="/projets" element={<Projet />} />
        <Route path='/service' element={<Service/>} />
        <Route path='/blog' element={<Blog/>}/>
      </Routes>
    
    <div>
    <Footer/>
    </div>
     
    </>
  )
}

export default App

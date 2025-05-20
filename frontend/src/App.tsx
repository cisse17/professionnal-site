import './App.css'
import Projet from './components/Projet'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Service from './components/Service'
import Blog from './components/blog/Blog'
import Footer from './components/Footer'


import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import BlogDetail from './components/blog/BlogDetail'
import Chatbot from './components/chatbot/chatbot'




function App() {
  
  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  return (
    <>
    <div>
      <Navbar />
    </div>
 
  <Chatbot/>
      <Routes>
      
        <Route path="/home" element={<Home />} />
        
        <Route path="/projets" element={<Projet />} />
        <Route path='/service' element={<Service/>} />
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/blog/:slug' element={<BlogDetail/>}/>
      </Routes>
    
    <div>
    <Footer/>
    </div>
     
    </>
  )
}

export default App

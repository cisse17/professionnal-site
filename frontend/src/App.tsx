import './App.css'
import Projet from './components/Projet'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Service from './components/Service'
import Blog from './components/Blog'
import Footer from './components/Footer'

function App() {
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

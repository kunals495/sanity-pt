import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'    
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import './App.css'

function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}

export default App

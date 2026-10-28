import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Events from './components/Events'
import Workshops from './components/Workshops'
import Registration from './components/Registration'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import BackgroundAnimation from './components/BackgroundAnimation'
import Milestones from './pages/Milestones'
import Feedback from './pages/Feedback'
import Guests from './pages/Guests'
import CustomCursor from './components/CustomCursor'

function App() {
  const [loading, setLoading] = useState(true)

  const handlePreloaderComplete = () => {
    setLoading(false)
  }

  return (
    <Router>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <div className={`app-container ${loading ? 'hidden' : ''}`}>
        <CustomCursor />
        <BackgroundAnimation />
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Events />
              <Workshops />
              <Registration />
              <Footer />
            </>
          } />
          <Route path="/guests" element={<Guests />} />
          <Route path="/milestones" element={<Milestones />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
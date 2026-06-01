import React, { useState } from 'react'
import Home from './Components/Home PAge/Home'
import About from './Components/About'
import Contact from './Components/Contact'

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div>
      {/* Premium Floating Header */}
      <header>
        <div className='app-header-container'>
          <a href="#home" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }} className='brand-title'>
            HOTEL <span>SHARNAM</span>
          </a>
          <nav>
            <ul>
              <li>
                <a 
                  href="#home" 
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage('home')
                  }}
                  className={currentPage === 'home' ? 'active' : ''}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage('about')
                  }}
                  className={currentPage === 'about' ? 'active' : ''}
                >
                  Heritage
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage('contact')
                  }}
                  className={currentPage === 'contact' ? 'active' : ''}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main>
        {currentPage === 'home' && <Home />}
        {currentPage === 'about' && <About />}
        {currentPage === 'contact' && <Contact />}
      </main>

      {/* Premium Multi-Column Editorial Footer */}
      <footer>
        <div className='footer-container'>
          <div className='footer-section-col'>
            <h4>Reservations</h4>
            <p><strong>Phone:</strong> +91 123 456 7890</p>
            <p><strong>Email:</strong> reservations@sharnamshegaon.com</p>
            <p><strong>Desk Hours:</strong> 24/7 Concierge Service</p>
          </div>

          <div className='footer-section-col'>
            <h4>Discovery</h4>
            <ul>
              <li><a href="#story" onClick={(e) => e.preventDefault()}>The Sharnam Story</a></li>
              <li><a href="#gajanan" onClick={(e) => e.preventDefault()}>Gajanan Maharaj Heritage</a></li>
              <li><a href="#pilgrimage" onClick={(e) => e.preventDefault()}>Sustainable Pilgrimage</a></li>
              <li><a href="#careers" onClick={(e) => e.preventDefault()}>Career Opportunities</a></li>
            </ul>
          </div>

          <div className='footer-section-col'>
            <h4>Legal & Policy</h4>
            <ul>
              <li><a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a></li>
              <li><a href="#accessibility" onClick={(e) => e.preventDefault()}>Accessibility</a></li>
              <li><a href="#sustainability" onClick={(e) => e.preventDefault()}>Sustainability</a></li>
            </ul>
          </div>

          <div className='footer-section-col'>
            <h4>Local Time</h4>
            <p style={{ fontSize: '1.8rem', fontFamily: 'Playfair Display', color: '#c5a059', marginTop: '0.5rem' }}>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p style={{ fontSize: '0.85rem', opacity: '0.7' }}>Shegaon, Maharashtra, India</p>
          </div>
        </div>

        <div className='footer-bottom'>
          <p>© 2026 Hotel Sharnam Shegaon Portal. All rights reserved.</p>
          <p>Designed in harmony with Serene Majesty</p>
        </div>
      </footer>
    </div>
  )
}

export default App

import React, { useState } from 'react'
import './About.css'
import Card from './Card/card'


const About = () => {
  const [activeMilestone, setActiveMilestone] = useState(0)

  const milestones = [
    {
      year: '1908',
      title: 'The Divine Presence',
      description: 'Sant Gajanan Maharaj blesses the sacred soil of Shegaon. His simple, profound presence establishes Shegaon as a premier spiritual beacon of devotion, humility, and peace in Maharashtra.',
      highlight: 'Establishment of the spiritual foundation of Shegaon.'
    },
    {
      year: '1910',
      title: 'The Samadhi Sanctuary',
      description: 'The foundation for the historic Shri Gajanan Maharaj Temple complex is laid. The surrounding town becomes a dedicated sanctuary of pilgrimage, attracting millions of spiritual seekers.',
      highlight: 'Beginning of the sacred temple architectural journey.'
    },
    {
      year: '1974',
      title: 'The Heritage Union',
      description: 'Sharnam collaborators and historians start documenting regional Maratha stone carvings and Vidarbha architecture, committing to preserving local identity through luxury restoration.',
      highlight: 'First plans to blend royal Indian hospitality with pilgrimage culture.'
    },
    {
      year: '2026',
      title: 'Serene Majesty Unveiled',
      description: 'Hotel Sharnam officially opens its sacred portals. Built with hand-carved Vidarbha stone and temple geometry, it stands as the absolute pinnacle of luxury hospitality for the modern pilgrim.',
      highlight: 'A majestic architectural tribute to Sant Gajanan Maharaj.'
    }
  ]

  const values = [
    { 
      icon: '🏛️', 
      title: 'The Central Courtyard', 
      text: 'A majestic open-sky courtyard styled with deep-set Maratha arches, offering a serene space designed for evening reflection and spiritual solace.' 
    },
    { 
      icon: '🏺', 
      title: 'Local Artistry', 
      text: 'Every wall and pillar features traditional carvings and motifs, handcrafted by local Vidarbha artisans to preserve the authentic legacy of the land.' 
    },
    { 
      icon: '🚪', 
      title: 'Sacred Portals', 
      text: 'Our monumental gates and passageways draw direct geometric inspiration from regional temple entries, transitioning you into quiet peace.' 
    }
  ]

  return (
    <div className='about-container'>
      {/* Editorial Header */}
      <header className='about-header'>
        <span className='section-tag'>Sacred Traditions, Modern Luxury</span>
        <h2>A Journey Through Time</h2>
        <div className='title-accent'></div>
        <p className='about-intro'>
          Nestled in the spiritual heart of Maharashtra, Hotel Sharnam stands as a testament to the enduring spirit of pilgrimage and the refined elegance of the Sharnam legacy. Born from a vision to provide a sanctuary for the soul, our property mirrors the tranquility of the Shri Gajanan Maharaj Temple. Every stone laid and every arch carved tells a story of devotion, meticulously designed to bridge the gap between ancient Maratha heritage and contemporary comfort.
        </p>
      </header>
      
      <hr className='divider' />

      {/* Architectural Harmony Cards */}
      <section className='values-section'>
        {values.map((val, idx) => (
          <div className='value-card' key={idx}>
            <div className='value-icon'>{val.icon}</div>
            <h3>{val.title}</h3>
            <p>{val.text}</p>
          </div>
        ))}
      </section>

      {/* Shegaon Milestone Timeline */}
      <section className='timeline-section'>
        <h3>Our Historical Milestones</h3>
        <p className='timeline-sub'>Click on the years below to explore our spiritual and architectural journey</p>
        
        <div className='timeline-navigation'>
          {milestones.map((milestone, idx) => (
            <button
              key={idx}
              className={`timeline-btn ${activeMilestone === idx ? 'active' : ''}`}
              onClick={() => setActiveMilestone(idx)}
            >
              <span className='timeline-year'>{milestone.year}</span>
              <span className='timeline-dot'></span>
            </button>
          ))}
        </div>

        <div className='timeline-display-card'>
          <div className='timeline-content'>
            <span className='milestone-badge'>{milestones[activeMilestone].year} Era</span>
            <h4>{milestones[activeMilestone].title}</h4>
            <p className='milestone-description'>{milestones[activeMilestone].description}</p>
            <div className='milestone-highlight'>
              <strong>Key Legacy:</strong> {milestones[activeMilestone].highlight}
            </div>
          </div>
        </div>
      </section>

      {/* General Manager Statement & Heritage stats */}
      <section className='stats-section' style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center', textAlign: 'center' }}>
        <div className='gm-statement' style={{ maxWidth: '800px' }}>
          <p style={{ fontStyle: 'italic', fontSize: '1.4rem', fontFamily: 'Playfair Display', color: '#c5a059', lineHeight: '1.6', marginBottom: '1rem' }}>
            "Experience the intersection of divinity and luxury in the heart of Vidarbha."
          </p>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem', fontWeight: '700' }}>
            Vikram Aditya Singh, General Manager
          </span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '3rem', flexWrap: 'wrap', gap: '2rem' }}>
          <div className='stat-item'>
            <span className='stat-num'>1908</span>
            <span className='stat-label'>Legacy Roots</span>
          </div>
          <div className='stat-item'>
            <span className='stat-num'>100%</span>
            <span className='stat-label'>Sattvic Dining</span>
          </div>
          <div className='stat-item'>
            <span className='stat-num'>4.9★</span>
            <span className='stat-label'>Serenity Index</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

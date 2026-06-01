import React, { useState } from 'react'
import './Home.css'

const Home = () => {
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingStatus, setBookingStatus] = useState('idle') // idle, submitting, confirmed
  const [confirmedBooking, setConfirmedBooking] = useState(null)
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    roomType: 'maharaja',
    guests: '2'
  })

  // Room pricing details from Stitch Shegaon theme
  const roomDetails = {
    maharaja: { name: 'The Maharaja Suite', price: 650, view: 'Panoramic Temple View' },
    garden: { name: 'Deluxe Garden Room', price: 350, view: 'Private Courtyard & Morning Sun' },
    twin: { name: 'Heritage Twin Suite', price: 280, view: 'Refined Comfort for Spiritual Journeys' }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleBookClick = () => {
    setShowBookingModal(true)
    setBookingStatus('idle')
    setConfirmedBooking(null)
  }

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert('Please select both Check-In and Check-Out dates.')
      return
    }
    setBookingStatus('submitting')
    
    try {
      const payload = {
        roomType: bookingData.roomType,
        roomName: roomDetails[bookingData.roomType].name,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: parseInt(bookingData.guests),
        totalPrice: roomDetails[bookingData.roomType].price
      }

      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      if (response.ok && data.success) {
        setConfirmedBooking(data.booking)
        setBookingStatus('confirmed')
      } else {
        alert(data.error || 'Failed to complete booking reservation.')
        setBookingStatus('idle')
      }
    } catch (error) {
      console.error('Error submitting booking:', error)
      alert('Could not connect to MongoDB server. Please ensure the backend server is running.')
      setBookingStatus('idle')
    }
  }

  const closeBookingModal = () => {
    setShowBookingModal(false)
    setBookingStatus('idle')
    setConfirmedBooking(null)
    setBookingData({
      checkIn: '',
      checkOut: '',
      roomType: 'maharaja',
      guests: '2'
    })
  }

  return (
    <div className='home-container'>
      {/* Luxury Hero Banner */}
      <header className='home-header'>
        <span className='hero-subtitle'>Where Timeless Heritage Meets Modern Serenity</span>
        <h1>Sanctuary Crafted for the Soul</h1>
        <p>Discover a sanctuary nestled in the heart of sacred Shegaon. Experience the perfect union of spiritual heritage and luxury hospitality, honoring the sacred legacy of Sant Gajanan Maharaj.</p>
        <button className='home-button' onClick={handleBookClick}>Book Your Stay</button>
      </header> 
      
      <hr className='divider' />

      {/* Intro Editorial Section */}
      <section className='editorial-intro-section'>
        <div className='editorial-content'>
          <span className='section-tag'>The Sanctuary</span>
          <h2>A Sacred Retreat for the Discerning Traveler</h2>
          <p>
            Hotel Sharnam honors the spiritual legacy of Sant Gajanan Maharaj while providing an oasis of modern luxury. Our architecture draws inspiration from regional motifs, blending sacred geometry with minimalist elegance to create spaces that breathe and inspire.
          </p>
          <button className='outline-action-btn' onClick={(e) => { e.preventDefault(); alert("Welcome to Shegaon! Discover temple history, historic shrines, and serene environments."); }}>
            Learn More About Shegaon
          </button>
        </div>
      </section>

      {/* Rooms - Sanctuaries of Serenity Section */}
      <section className='rooms-showcase-section'>
        <div className='section-header-wrap'>
          <span className='section-tag'>Accommodations</span>
          <h2>Sanctuaries of Serenity</h2>
        </div>
        
        <div className='rooms-grid'>
          <div className='room-card'>
            <div className='room-img-placeholder' style={{ background: 'linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.6)), url("https://cf.bstatic.com/xdata/images/hotel/max1024x768/138038831.jpg?k=31b88e8260b366d224e502f4f43d569c6434654d982bd683b2831fff4ada6df7&o=") center/cover no-repeat' }}>
              <span className='room-tag'>Peak Luxury</span>
            </div>
            <div className='room-details-box'>
              <h3>{roomDetails.maharaja.name}</h3>
              <p>{roomDetails.maharaja.view}</p>
              <div className='room-footer-row'>
                <span className='room-price'>${roomDetails.maharaja.price} / night</span>
                <button className='room-select-btn' onClick={handleBookClick}>Reserve</button>
              </div>
            </div>
          </div>

          <div className='room-card'>
            <div className='room-img-placeholder' style={{ background: 'linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.6)), url("https://cf.bstatic.com/xdata/images/hotel/max1024x768/138038865.jpg?k=b21317e65121af4ebd6b40f2c25350a300243f2a30f299a385425fc08971d896&o=") center/cover no-repeat' }}>
              <span className='room-tag'>Nature Retreat</span>
            </div>
            <div className='room-details-box'>
              <h3>{roomDetails.garden.name}</h3>
              <p>{roomDetails.garden.view}</p>
              <div className='room-footer-row'>
                <span className='room-price'>${roomDetails.garden.price} / night</span>
                <button className='room-select-btn' onClick={handleBookClick}>Reserve</button>
              </div>
            </div>
          </div>

          <div className='room-card'>
            <div className='room-img-placeholder' style={{ background: 'linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.6)), url("https://cf.bstatic.com/xdata/images/hotel/max1024x768/138038859.jpg?k=b40008638b5c0972a14ce2bdbae916f7aa117803a00969802133b5576ca9fa2e&o=") center/cover no-repeat' }}>
              <span className='room-tag'>Comfort Suite</span>
            </div>
            <div className='room-details-box'>
              <h3>{roomDetails.twin.name}</h3>
              <p>{roomDetails.twin.view}</p>
              <div className='room-footer-row'>
                <span className='room-price'>${roomDetails.twin.price} / night</span>
                <button className='room-select-btn' onClick={handleBookClick}>Reserve</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culinary & Spa Highlight Section */}
      <section className='highlights-grid-section'>
        <div className='highlight-card'>
          <span className='section-tag'>Culinary Art</span>
          <h3>The Golden Thali</h3>
          <p>
            Elevating traditional sattvic cuisine to a fine art. Our chefs source organic ingredients from the sacred lands of Vidarbha to create nourishing, soul-stirring meals.
          </p>
        </div>

        <div className='highlight-card'>
          <span className='section-tag'>Holistic Wellness</span>
          <h3>Jiva Spa Shegaon</h3>
          <p>
            Ancient Ayurvedic therapies tailored for the modern pilgrim. Find balance in our meditation chambers and therapeutic pools designed for ultimate stillness.
          </p>
        </div>
      </section>

      {/* Dynamic Booking System Modal Overlay */}
      {showBookingModal && (
        <div className='booking-modal-backdrop'>
          <div className='booking-modal-card'>
            <button className='booking-close-x' onClick={closeBookingModal}>×</button>
            
            {bookingStatus === 'idle' && (
              <>
                <span className='modal-subtitle'>Hotel Sharnam Booking Desk</span>
                <h3>Secure Your Sanctuary</h3>
                
                <form onSubmit={handleBookingSubmit} className='booking-form'>
                  <div className='form-row'>
                    <div className='input-field'>
                      <label>Check-In Date</label>
                      <input
                        type='date'
                        name='checkIn'
                        value={bookingData.checkIn}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className='input-field'>
                      <label>Check-Out Date</label>
                      <input
                        type='date'
                        name='checkOut'
                        value={bookingData.checkOut}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className='form-row'>
                    <div className='input-field'>
                      <label>Select Sanctuary Accommodation</label>
                      <select 
                        name='roomType' 
                        value={bookingData.roomType}
                        onChange={handleInputChange}
                      >
                        <option value='maharaja'>The Maharaja Suite (${roomDetails.maharaja.price}/night)</option>
                        <option value='garden'>Deluxe Garden Room (${roomDetails.garden.price}/night)</option>
                        <option value='twin'>Heritage Twin Suite (${roomDetails.twin.price}/night)</option>
                      </select>
                    </div>

                    <div className='input-field'>
                      <label>Guests</label>
                      <select 
                        name='guests' 
                        value={bookingData.guests}
                        onChange={handleInputChange}
                      >
                        <option value='1'>1 Guest</option>
                        <option value='2'>2 Guests</option>
                        <option value='3'>3 Guests</option>
                        <option value='4'>4+ Guests</option>
                      </select>
                    </div>
                  </div>

                  <div className='price-calculator'>
                    <span>Current rate:</span>
                    <strong>${roomDetails[bookingData.roomType].price} / night</strong>
                  </div>

                  <button type='submit' className='booking-confirm-btn'>
                    Confirm Sanctuary Booking
                  </button>
                </form>
              </>
            )}

            {bookingStatus === 'submitting' && (
              <div className='booking-processing'>
                <div className='royal-spinner'></div>
                <h3>Verifying Room Availability</h3>
                <p>Connecting with our luxury reservation vault, please wait...</p>
              </div>
            )}

            {bookingStatus === 'confirmed' && (
              <div className='booking-confirmed-receipt'>
                <div className='receipt-crown'>👑</div>
                <h3>Sanctuary Reserved!</h3>
                <p className='success-sub'>Your spiritual oasis has been secured.</p>
                
                <div className='receipt-details'>
                  <div className='receipt-row'>
                    <span>Reference ID:</span>
                    <strong style={{ color: 'var(--primary-gold)', letterSpacing: '0.05em' }}>
                      {confirmedBooking?.bookingReference || 'TAJ-SHG-PENDING'}
                    </strong>
                  </div>
                  <div className='receipt-row'>
                    <span>Room Type:</span>
                    <strong>{roomDetails[bookingData.roomType].name}</strong>
                  </div>
                  <div className='receipt-row'>
                    <span>Temple View Details:</span>
                    <strong>{roomDetails[bookingData.roomType].view}</strong>
                  </div>
                  <div className='receipt-row'>
                    <span>Check-In:</span>
                    <strong>{bookingData.checkIn}</strong>
                  </div>
                  <div className='receipt-row'>
                    <span>Check-Out:</span>
                    <strong>{bookingData.checkOut}</strong>
                  </div>
                  <div className='receipt-row'>
                    <span>Royal Guests:</span>
                    <strong>{bookingData.guests}</strong>
                  </div>
                </div>

                <div className='receipt-total'>
                  <span>Daily Luxury Rate:</span>
                  <strong>${roomDetails[bookingData.roomType].price} USD</strong>
                </div>

                <p className='welcome-msg'>A confirmation details sheet and your reference pass have been registered securely in MongoDB.</p>
                
                <button className='receipt-close-btn' onClick={closeBookingModal}>
                  OM NAMAH
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home

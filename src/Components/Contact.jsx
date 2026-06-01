import React, { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  
  const [formStatus, setFormStatus] = useState('idle') // idle, loading, success
  const [showModal, setShowModal] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.')
      return
    }

    setFormStatus('loading')

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      if (response.ok && data.success) {
        setFormStatus('success')
        setShowModal(true)
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        alert(data.error || 'Failed to submit concierge inquiry.')
        setFormStatus('idle')
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error)
      alert('Could not connect to MongoDB server. Please ensure the backend server is running.')
      setFormStatus('idle')
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setFormStatus('idle')
  }

  return (
    <div className='contact-container'>
      <header className='contact-header'>
        <h2>Get In Touch</h2>
        <div className='title-accent'></div>
        <p className='contact-intro'>
          Connect with our Elite Booking Concierge for bespoke bookings, royal event planning, or personalized dining inquiries. 
        </p>
      </header>
      <hr className='divider' />

      <div className='contact-layout'>
        {/* Contact Info Cards */}
        <div className='contact-info-panel'>
          <div className='info-card'>
            <span className='info-icon'>📍</span>
            <h4>Our Address</h4>
            <p>Hotel Sharnam, Shegaon Temple Road, Vidarbha, Maharashtra - 444303</p>
            <p className='sub-p'>Directly adjacent to the Gajanan Maharaj Shrine complex</p>
          </div>

          <div className='info-card'>
            <span className='info-icon'>📞</span>
            <h4>Royal Concierge Desk</h4>
            <p>+91 123 456 7890</p>
            <p className='sub-p'>Available 24 hours daily for bespoke requests</p>
          </div>

          <div className='info-card'>
            <span className='info-icon'>✉️</span>
            <h4>Email Reservations</h4>
            <p>reservations.shegaon@tajhotels.com</p>
            <p className='sub-p'>Expected callback time is within 2 hours</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className='contact-form-panel'>
          <h3>Send Us A Message</h3>
          <form onSubmit={handleSubmit} className='custom-contact-form'>
            <div className='input-group'>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder='Your Name *'
                className='form-input'
              />
            </div>

            <div className='input-group'>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder='Email Address *'
                className='form-input'
              />
            </div>

            <div className='input-group'>
              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
                placeholder='Phone Number (Optional)'
                className='form-input'
              />
            </div>

            <div className='input-group'>
              <textarea
                name='message'
                value={formData.message}
                onChange={handleInputChange}
                required
                rows='5'
                placeholder='Tell us how we can assist you... *'
                className='form-input form-textarea'
              ></textarea>
            </div>

            <button
              type='submit'
              className={`submit-btn ${formStatus === 'loading' ? 'btn-loading' : ''}`}
              disabled={formStatus === 'loading'}
            >
              {formStatus === 'loading' ? (
                <span className='btn-spinner'></span>
              ) : (
                'Submit Inquiry'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal Overlay */}
      {showModal && (
        <div className='modal-backdrop'>
          <div className='success-modal-card'>
            <div className='modal-success-badge'>✓</div>
            <h3>Inquiry Submitted!</h3>
            <p>Thank you for choosing Hotel Sharnam. A Concierge representative has been assigned to your request and will contact you via email or phone within the next 2 hours.</p>
            <button className='modal-close-btn' onClick={closeModal}>
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact

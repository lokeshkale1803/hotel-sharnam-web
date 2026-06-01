import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taj_shegaon_db';

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('🔮 Connected to Sacred MongoDB Sanctuary successfully!'))
  .catch((err) => console.error('⚠️ MongoDB Connection Error:', err));

// --- 1. Schemas & Models ---

// Booking Schema
const bookingSchema = new mongoose.Schema({
  roomType: { 
    type: String, 
    required: true, 
    enum: ['maharaja', 'garden', 'twin'] 
  },
  roomName: { 
    type: String, 
    required: true 
  },
  checkIn: { 
    type: Date, 
    required: true 
  },
  checkOut: { 
    type: Date, 
    required: true 
  },
  guests: { 
    type: Number, 
    required: true 
  },
  totalPrice: { 
    type: Number, 
    required: true 
  },
  bookingReference: { 
    type: String, 
    required: true, 
    unique: true 
  },
  status: { 
    type: String, 
    default: 'confirmed' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

// Inquiry Schema
const inquirySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String 
  },
  message: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

// --- 2. API Endpoints ---

// Base Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Hotel Sharnam Shegaon Portal Backend REST API' });
});

// Create a Sanctuary Booking
app.post('/api/bookings', async (req, res) => {
  try {
    const { roomType, roomName, checkIn, checkOut, guests, totalPrice } = req.body;

    if (!roomType || !roomName || !checkIn || !checkOut || !guests || !totalPrice) {
      return res.status(400).json({ error: 'All booking fields are required.' });
    }

    // Generate unique royal reference code (e.g. SRN-SHG-8F293)
    const randomHex = Math.floor(100000 + Math.random() * 900000).toString(16).toUpperCase();
    const bookingReference = `SRN-SHG-${randomHex}`;

    const newBooking = new Booking({
      roomType,
      roomName,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests: parseInt(guests),
      totalPrice: parseFloat(totalPrice),
      bookingReference
    });

    const savedBooking = await newBooking.save();
    console.log(`✅ Royal Booking saved: ${bookingReference}`);

    res.status(201).json({
      success: true,
      message: 'Sanctuary booking confirmed and saved in MongoDB!',
      booking: savedBooking
    });
  } catch (error) {
    console.error('❌ Error saving booking:', error);
    res.status(500).json({ error: 'Failed to process sanctuary booking.' });
  }
});

// Retrieve Bookings (Debugging & Admin dashboard)
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('❌ Error retrieving bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings.' });
  }
});

// Create a Concierge Inquiry
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required fields.' });
    }

    const newInquiry = new Inquiry({
      name,
      email,
      phone,
      message
    });

    const savedInquiry = await newInquiry.save();
    console.log(`✉️ Concierge Inquiry saved from: ${name}`);

    res.status(201).json({
      success: true,
      message: 'Concierge Inquiry submitted and saved in MongoDB!',
      inquiry: savedInquiry
    });
  } catch (error) {
    console.error('❌ Error saving inquiry:', error);
    res.status(500).json({ error: 'Failed to submit concierge inquiry.' });
  }
});

// Retrieve Inquiries
app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    console.error('❌ Error retrieving inquiries:', error);
    res.status(500).json({ error: 'Failed to fetch inquiries.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`👑 Hotel Sharnam Server running elegantly on http://localhost:${PORT}`);
});

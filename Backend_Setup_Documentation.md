# Backend & Database Setup Documentation

This document explains the step-by-step process used to set up the Node.js/Express backend and connect the React frontend to a local MongoDB database for the Contact Us form.

## 1. Project Structure Setup
A separate `backend` folder was created inside the main project directory to keep the server code isolated from the React frontend.

**Directory Structure:**
```text
react/02-folder/
├── src/                # React Frontend 
└── backend/            # Express Backend
    ├── src/
    │   ├── config/     # Database connection settings
    │   ├── models/     # MongoDB schemas (Mongoose)
    │   └── routes/     # API endpoints
    ├── .env            # Environment variables (Ports, DB URI)
    ├── app.js          # Express app configuration
    └── server.js       # Main entry point to start the server
```

## 2. Installing Required Dependencies
We initialized a Node.js project and installed the necessary packages for our backend:
```bash
cd backend
npm init -y
npm install express mongoose cors dotenv
```
- **express**: For creating the server and APIs.
- **mongoose**: For connecting to and interacting with the MongoDB database.
- **cors**: To allow the React frontend (running on port 5174/5175) to send requests to the backend (running on port 5000).
- **dotenv**: To manage environment variables safely.

## 3. Environment Variables (.env)
We created a `.env` file to store our port and database connection string.
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/hotel-sharnam
```
*(Note: `127.0.0.1` is preferred over `localhost` in newer Node.js versions to avoid IPv6 resolution issues).*

## 4. Database Connection Setup (config/database.js)
We set up the connection to the MongoDB Compass instance using Mongoose.
```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
```

## 5. Creating the Database Schema (models/Inquiry.js)
We created a schema that perfectly matches the fields from the React `Contact.jsx` form. This schema determines how data is saved in MongoDB.
```javascript
const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    message: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
```

## 6. Creating API Routes (routes/inquiryRoutes.js)
We created a POST API route where the React frontend will send its data. This route receives the data and saves it using the `Inquiry` model.
```javascript
const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        
        // Save to MongoDB
        const newInquiry = await Inquiry.create({ name, email, phone, message });
        
        // Send success response back to React
        res.status(201).json({ success: true, data: newInquiry });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

module.exports = router;
```

## 7. Configuring the Express App (app.js)
We connected the CORS policy, JSON parsing, and our newly created routes to the main express application.
```javascript
const express = require("express");
const cors = require("cors");
const inquiryRoutes = require("./src/routes/inquiryRoutes");

const app = express();

app.use(cors()); // Allows React to talk to this backend
app.use(express.json()); // Parses incoming JSON data

app.use("/api/inquiries", inquiryRoutes);

module.exports = app;
```

## 8. Starting the Server (server.js)
Finally, we put everything together in `server.js` to connect the database and start listening on port 5000.
```javascript
require('dotenv').config();
const app = require('./app');
const connectDB = require("./src/config/database");

connectDB(); // Connect to MongoDB Compass

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

## 9. Connecting Frontend to Backend
In the React component (`Contact.jsx`), we update the `fetch` API call to send a `POST` request to our new backend endpoint `http://localhost:5000/api/inquiries`.

```javascript
const response = await fetch('http://localhost:5000/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});
```

## 10. How to Run the Project
Whenever you restart your computer, you need to run the frontend and backend separately:

**Start the Backend:**
1. Open terminal.
2. Go to the backend folder: `cd backend`
3. Run the server: `npm start` (It should say "MongoDB Connected").

**Start the Frontend:**
1. Open a new terminal.
2. Stay in the main project folder.
3. Run the frontend: `npm run dev`

---
*End of Documentation*

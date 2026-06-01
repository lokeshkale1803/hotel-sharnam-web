const express = require("express");
const cors = require("cors");
const inquiryRoutes = require("./src/routes/inquiryRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/inquiries", inquiryRoutes);

module.exports = app;
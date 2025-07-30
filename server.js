const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Route imports
const contactRoutes = require('./backend/routes/contact');
const bookingRoutes = require('./backend/routes/booking');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // <--- Needed for form data

// Serve static files (e.g., CSS, JS, images) — update path if you store in /public
app.use(express.static(path.join(__dirname)));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Connection Error:", err));

// API routes
app.use('/api/contact', contactRoutes);
app.use('/api/book', bookingRoutes);

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Ensure index.html is at root
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

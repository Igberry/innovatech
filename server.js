const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const contactRoutes = require('./backend/routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files (e.g., CSS, JS, images) if any
app.use(express.static(path.join(__dirname)));

mongoose.connect(process.env.MONGODB_URL, {
}).then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// API routes
app.use('/api/contact', contactRoutes);

// Root route for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

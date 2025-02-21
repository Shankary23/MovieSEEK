const express = require('express');
const axios = require('axios');
const serverless = require('serverless-http'); // Import the serverless module here
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

app.use(express.json());
app.use(cors());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Movie Microservice API! Use /search?query=movie_name or /movie/:id');
});

// Search for movies
app.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: { api_key: TMDB_API_KEY, query }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movie data' });
    }
});

// Get movie details by ID
app.get('/movie/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
            params: { api_key: TMDB_API_KEY }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movie details' });
    }
});

// Start the Express server locally
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Vercel handler export (optional for serverless environments like Vercel)
module.exports = app;
module.exports.handler = serverless(app); // Export the handler for Vercel to use

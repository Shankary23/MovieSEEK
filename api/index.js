const express = require('express');
const axios = require('axios');
const serverless = require('serverless-http'); // Required for Vercel

const app = express();
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

app.use(express.json());

// Root route
app.get('/', (req, res) =>{
    res.send('Welcome to the Movie Microservice API! Use /search?query=movie_name or /movie/:id');
});

// Search for movies
app.get('/search', async (req, res) =>{
    try {
        const { query } = req.query;
        if (!query){
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
app.get('/movie/:id', async (req, res) =>{
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

module.exports = app;
module.exports.handler = serverless(app); // This is needed for Vercel

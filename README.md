# Communication Contract 
  A. To request data from the server use: https://movie-seek.vercel.app/search?query=${query},      query here being whatever movie title the user passes through the program.
  
  B. After the request is sent then the JSON data received is stored in       
  setMovies(response.data.results), or wherever you decide to store the data, and to use the   
  data you can choose whether to use the movie.title data for the title of the movie, 
  movie.overview for the overview data for the movie, or any other data you want. 

  **Getting the data from the server**
  ```
   const response = await axios.get(`https://movie-seek.vercel.app/search?query=${query}`);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies", error);
    }

  ```

  **Server when queried**
  ```
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
  ```

  **UML Diagram**
  <img width="671" alt="Screenshot 2025-02-24 at 1 24 18 PM" src="https://github.com/user-attachments/assets/a5da5245-46e0-4984-b3cd-0d2b21bc12ad" />

  

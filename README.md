#**Communication Contract**#
  A. To request data from the server use: https://movie-seek.vercel.app/search?query=${query},      query here being whatever movie title the user passes through the program.
  
  B. After the request is sent then the JSON data received is stored in       
  setMovies(response.data.results), or wherever you decide to store the data, and to use the   
  data you can choose whether to use the movie.title data for the title of the movie, 
  movie.overview for the overview data for the movie, or any other data you want. 

// services/omdbService.js
import { OMDB_API_KEY } from '~/utils/config';
import { knownMovieIds } from '~/utils/config';

const OMDB_BASE_URL = 'https://www.omdbapi.com/';

export default {
  async searchMovies(query) {
    try {
      const response = await fetch(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${query}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en la llamada a la API de OMDB:', error);
      throw error;
    }
  },
  
  async getPlaceholderMovies(startIndex = 0, batchSize = 9) {
    const movies = [];
  
    const end = startIndex + batchSize;
    const batchIds = knownMovieIds.slice(startIndex, end);
  
    for (const movieId of batchIds) {
      try {
        const response = await fetch(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${movieId}`);
        const data = await response.json();
  
        // Check if the response contains valid movie data
        if (data.Response === 'True') {
          movies.push(data);
        } else {
          console.error(`Error obtaining data for movie with ID ${movieId}: ${data.Error}`);
        }
      } catch (error) {
        console.error(`Error obtaining data for movie with ID ${movieId}:`, error);
      }
    }
  
    return movies;
  },
  
  async getRandomMovieIds() {
    try {
      const randomMovieIds = Array.from({ length: 9 }, () => {
        const randomId = Math.floor(Math.random() * 10000000) + 1;
        return `tt${randomId}`;
      });

      const promises = randomMovieIds.map(id => fetch(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${id}`));
      const responses = await Promise.all(promises);
      const data = await Promise.all(responses.map(response => response.json()));
      return data;
    } catch (error) {
      console.error('Error en la obtención de películas aleatorias:', error);
      throw error;
    }
  },

  async getMovieById(id) {
    try {
      const response = await fetch(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error en la obtención de la película con ID ${id}:`, error);
      throw error;
    }
  }
};

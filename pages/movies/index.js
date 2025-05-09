import { useState } from 'react';
import Layout from '../../components/Layout';
import MovieCard from '../../components/MovieCard';
import axios from 'axios';

export default function Movies({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState('all');
  
  const filteredMovies = selectedGenre === 'all' 
    ? movies 
    : movies.filter(movie => {
        const genreId = movie.genreId;
        return genreId === selectedGenre;
      });

  return (
    <Layout title="Movie House - All Movies">
      <h2 className="section-title">All Movies</h2>
      
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <label htmlFor="genre-filter" style={{ marginRight: '10px' }}>Filter by Genre:</label>
        <select 
          id="genre-filter"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          style={{ 
            padding: '8px 15px', 
            borderRadius: '4px', 
            border: '1px solid #ddd' 
          }}
        >
          <option value="all">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id || genre._id} value={genre.id || genre._id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="movie-grid">
        {filteredMovies.map(movie => (
          <MovieCard key={movie.id || movie._id} movie={movie} />
        ))}
      </div>
      
      {filteredMovies.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '30px' }}>
          No movies found for this genre.
        </p>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const [moviesRes, genresRes] = await Promise.all([
      axios.get(`${baseUrl}/api/movies`),
      axios.get(`${baseUrl}/api/genres`)
    ]);
    
    return {
      props: {
        movies: moviesRes.data,
        genres: genresRes.data
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        movies: [],
        genres: []
      }
    };
  }
} 
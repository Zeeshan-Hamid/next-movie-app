import Layout from '../../components/Layout';
import MovieCard from '../../components/MovieCard';
import Link from 'next/link';
import axios from 'axios';

export default function GenreDetail({ genre, movies }) {
  if (!genre) {
    return (
      <Layout title="Movie House - Not Found">
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <h2>Genre not found</h2>
          <p>The genre you are looking for does not exist.</p>
          <Link href="/genres" className="button-primary">
            Back to Genres
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Movie House - Genre: ${genre.name}`}>
      <h2 className="section-title">{genre.name} Movies</h2>
      
      {movies.length > 0 ? (
        <div className="movie-grid">
          {movies.map(movie => (
            <MovieCard key={movie.id || movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '30px' }}>
          No movies found in this genre.
        </p>
      )}
      
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link href="/genres" className="button-primary">
          Back to Genres
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    
    // Get genre information
    const { data: genresData } = await axios.get(`${baseUrl}/api/genres`);
    const genre = genresData.find(g => g.id === params.id || g._id === params.id);
    
    if (!genre) {
      return { props: { genre: null, movies: [] } };
    }
    
    // Get movies for this genre
    const { data: movies } = await axios.get(`${baseUrl}/api/genres/${params.id}/movies`);
    
    return {
      props: {
        genre,
        movies
      }
    };
  } catch (error) {
    console.error('Error fetching genre details:', error);
    return {
      props: {
        genre: null,
        movies: []
      }
    };
  }
} 
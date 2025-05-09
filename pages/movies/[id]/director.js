import Link from 'next/link';
import Layout from '../../../components/Layout';
import MovieCard from '../../../components/MovieCard';
import axios from 'axios';

export default function DirectorDetail({ movie, director, directorMovies }) {
  if (!movie || !director) {
    return (
      <Layout title="Movie House - Not Found">
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <h2>Director not found</h2>
          <p>The director information you are looking for does not exist.</p>
          <Link href="/movies" className="button-primary">
            Back to Movies
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Movie House - Director: ${director.name}`}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '5px' }}>{director.name}</h1>
        <p style={{ marginBottom: '30px', fontSize: '1.1rem' }}>Director</p>
        
        <div style={{ 
          background: '#f5f5f5', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '30px' 
        }}>
          <h3>Biography</h3>
          <p>{director.biography}</p>
        </div>
        
        <h3>Movies by {director.name}</h3>
        <div className="movie-grid">
          {directorMovies.map(movie => (
            <MovieCard key={movie.id || movie._id} movie={movie} />
          ))}
        </div>
        
        <div style={{ marginTop: '30px' }}>
          <Link href={`/movies/${movie.id || movie._id}`} className="button-primary" style={{ marginRight: '15px' }}>
            Back to Movie
          </Link>
          
          <Link href="/directors" className="button-secondary">
            All Directors
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    
    // Get the movie
    const { data: movie } = await axios.get(`${baseUrl}/api/movies/${params.id}`);
    
    if (!movie) {
      return { props: { movie: null } };
    }
    
    // Get director information and their movies
    const { data: directorData } = await axios.get(`${baseUrl}/api/directors/${movie.directorId}`);
    
    if (!directorData || !directorData.director) {
      return { props: { movie, director: null, directorMovies: [] } };
    }
    
    return {
      props: {
        movie,
        director: directorData.director,
        directorMovies: directorData.movies || []
      }
    };
  } catch (error) {
    console.error('Error fetching director details:', error);
    return {
      props: {
        movie: null,
        director: null,
        directorMovies: []
      }
    };
  }
} 
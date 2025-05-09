import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import MovieCard from '../components/MovieCard';
import axios from 'axios';

export default function Home({ trendingMovies }) {
  const router = useRouter();

  const handleBrowseGenres = () => {
    router.push('/genres');
  };

  return (
    <Layout title="Movie House - Home">
      <h2 className="section-title">Trending Movies</h2>
      
      <div className="movie-grid">
        {trendingMovies.map(movie => (
          <MovieCard key={movie.id || movie._id} movie={movie} />
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button 
          className="button-primary" 
          onClick={handleBrowseGenres}
        >
          Browse Genres
        </button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const { data: movies } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/movies`);
    
    // Filter trending movies (rating >= 8.5)
    const trendingMovies = movies.filter(movie => movie.rating >= 8.5);
    
    return {
      props: {
        trendingMovies
      }
    };
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return {
      props: {
        trendingMovies: []
      }
    };
  }
}

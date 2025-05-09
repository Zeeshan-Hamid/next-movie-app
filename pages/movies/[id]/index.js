import Link from 'next/link';
import Layout from '../../../components/Layout';
import styles from '../../../styles/MovieDetail.module.css';
import axios from 'axios';

export default function MovieDetail({ movie, genre, director }) {
  if (!movie) {
    return (
      <Layout title="Movie House - Not Found">
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <h2>Movie not found</h2>
          <p>The movie you are looking for does not exist.</p>
          <Link href="/movies" className="button-primary">
            Back to Movies
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Movie House - ${movie.title}`}>
      <div className={styles.container}>
        <h1 className={styles.title}>{movie.title}</h1>
        <div className={styles.meta}>
          <span className={styles.tag}>{movie.releaseYear}</span>
          <span className={styles.tag}>{genre?.name || 'Unknown Genre'}</span>
          <span className={styles.tag}>⭐ {movie.rating.toFixed(1)}</span>
        </div>
        
        <div className={styles.descriptionBox}>
          <h3>Description</h3>
          <p>{movie.description}</p>
        </div>
        
        <div className={styles.directorSection}>
          <h3>Director</h3>
          <p className={styles.directorName}>{director?.name || 'Unknown Director'}</p>
          <Link href={`/movies/${movie.id || movie._id}/director`} className="button-secondary">
            View Director Details
          </Link>
        </div>
        
        <div className={styles.buttonContainer}>
          <Link href="/movies" className="button-primary">
            Back to Movies
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const { data: movie } = await axios.get(`${baseUrl}/api/movies/${params.id}`);
    
    if (!movie) {
      return { props: { movie: null } };
    }
    
    // Get genre information
    let genre = null;
    try {
      const genreId = movie.genreId;
      const { data: genresData } = await axios.get(`${baseUrl}/api/genres`);
      genre = genresData.find(g => g.id === genreId || g._id === genreId);
    } catch (error) {
      console.error('Error fetching genre:', error);
    }
    
    // Get director information
    let director = null;
    try {
      const directorId = movie.directorId;
      const { data: directorsData } = await axios.get(`${baseUrl}/api/directors`);
      director = directorsData.find(d => d.id === directorId || d._id === directorId);
    } catch (error) {
      console.error('Error fetching director:', error);
    }
    
    return {
      props: {
        movie,
        genre,
        director
      }
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return {
      props: {
        movie: null
      }
    };
  }
} 
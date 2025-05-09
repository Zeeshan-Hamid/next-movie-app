import Link from 'next/link';
import styles from '../styles/MovieCard.module.css';

const MovieCard = ({ movie }) => {
  // Handle both MongoDB _id and string id
  const movieId = movie.id || movie._id;
  
  return (
    <div className={styles.card}>
      <h3>{movie.title}</h3>
      <p className={styles.year}>{movie.releaseYear}</p>
      <p className={styles.description}>{movie.description}</p>
      <div className={styles.rating}>
        <span>⭐ {movie.rating.toFixed(1)}</span>
      </div>
      <Link href={`/movies/${movieId}`} className={styles.button}>
        View Details
      </Link>
    </div>
  );
};

export default MovieCard; 
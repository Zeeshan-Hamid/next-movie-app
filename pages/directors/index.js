import { useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import Layout from '../../components/Layout';
import styles from '../../styles/Directors.module.css';
import axios from 'axios';

const fetcher = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const { data: directors } = await axios.get(`${baseUrl}/api/directors`);
    
    // For each director, get their movies
    const directorsWithMovies = await Promise.all(directors.map(async (director) => {
      try {
        const directorId = director.id || director._id;
        const { data } = await axios.get(`${baseUrl}/api/directors/${directorId}`);
        
        // The API returns { director, movies } structure
        return {
          ...director,
          movies: data.movies || []
        };
      } catch (error) {
        console.error(`Error fetching movies for director ${director.name}:`, error);
        return {
          ...director,
          movies: []
        };
      }
    }));
    
    return directorsWithMovies;
  } catch (error) {
    console.error('Error in fetcher:', error);
    throw error;
  }
};

export default function Directors() {
  const { data: directors, error, isLoading } = useSWR('directors', fetcher);
  const [selectedDirector, setSelectedDirector] = useState(null);
  
  const handleDirectorClick = (director) => {
    setSelectedDirector(director);
  };
  
  return (
    <Layout title="Movie House - Directors">
      <h2 className="section-title">Directors</h2>
      
      {isLoading && (
        <div className="fade-in" style={{ textAlign: 'center', padding: '40px 0' }}>
          <div className="loader"></div>
          <p>Loading directors...</p>
        </div>
      )}
      
      {error && (
        <div style={{ textAlign: 'center', color: 'var(--secondary)', padding: '40px 0' }}>
          <p>Error loading directors. Please try again.</p>
          <p>{error.message}</p>
        </div>
      )}
      
      <div className={styles.directorsLayout}>
        <div className={styles.directorsListContainer}>
          {directors && directors.map(director => (
            <div 
              key={director.id || director._id}
              onClick={() => handleDirectorClick(director)}
              className={`${styles.directorCard} ${
                selectedDirector?.id === director.id || selectedDirector?._id === director._id
                  ? styles.directorCardActive 
                  : styles.directorCardInactive
              }`}
            >
              <h3 className={styles.directorName}>{director.name}</h3>
              <p className={styles.movieCount}>
                {director.movies.length} movie{director.movies.length !== 1 ? 's' : ''}
              </p>
            </div>
          ))}
        </div>
        
        <div className={styles.directorDetailsContainer}>
          {selectedDirector ? (
            <div className={styles.directorDetailCard}>
              <h2 className={styles.directorDetailName}>{selectedDirector.name}</h2>
              
              <div className={styles.bioBox}>
                <h3 className={styles.bioHeading}>Biography</h3>
                <p className={styles.bioText}>{selectedDirector.biography}</p>
              </div>
              
              <h3 className={styles.moviesHeading}>Movies</h3>
              {selectedDirector.movies && selectedDirector.movies.length > 0 ? (
                <ul className={styles.moviesList}>
                  {selectedDirector.movies.map(movie => (
                    <li key={movie.id || movie._id} className={styles.movieItem}>
                      <Link 
                        href={`/movies/${movie.id || movie._id}`}
                        className={styles.movieLink}
                      >
                        <span>{movie.title}</span>
                        <span>{movie.releaseYear}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No movies found for this director.</p>
              )}
            </div>
          ) : (
            <div className={styles.placeholderBox}>
              <p className={styles.placeholderText}>Select a director to view details</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 
import Link from 'next/link';
import Layout from '../../components/Layout';
import styles from '../../styles/Genres.module.css';
import axios from 'axios';

export default function Genres({ genres }) {
  return (
    <Layout title="Movie House - Genres">
      <h2 className="section-title">Movie Genres</h2>
      
      <div className={styles.genreGrid}>
        {genres.map(genre => (
          <Link 
            href={`/genres/${genre.id || genre._id}`} 
            key={genre.id || genre._id}
            className={styles.genreCard}
          >
            <h3 className={styles.genreTitle}>{genre.name}</h3>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const { data: genres } = await axios.get(`${baseUrl}/api/genres`);
    
    return {
      props: {
        genres
      }
    };
  } catch (error) {
    console.error('Error fetching genres:', error);
    return {
      props: {
        genres: []
      }
    };
  }
} 
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/404.module.css';

export default function Custom404() {
  return (
    <Layout title="Movie House - Page Not Found">
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page Not Found</h2>
        <p className={styles.text}>
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <Link href="/" className={styles.button}>
          Return to Home
        </Link>
      </div>
    </Layout>
  );
} 
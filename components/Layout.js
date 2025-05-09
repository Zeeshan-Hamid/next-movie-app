import Head from 'next/head';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';
import { useEffect, useState } from 'react';

const Layout = ({ children, title = 'Movie House' }) => {
  const { darkMode, toggleDarkMode, isLoaded } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Movie House - A movie management web application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header className="header">
        <div className="container">
          <div className="header-content">
            <h1>
              <Link href="/" className="title-link">
                Movie House
              </Link>
            </h1>
            <div className="header-right">
              <nav>
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/movies" className="nav-link">Movies</Link>
                <Link href="/genres" className="nav-link">Genres</Link>
                <Link href="/directors" className="nav-link">Directors</Link>
                <Link href="/help" className="nav-link">Help</Link>
              </nav>
              {mounted && (
                <button 
                  onClick={toggleDarkMode} 
                  className="theme-toggle"
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                  title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  <span className="theme-toggle-icon">
                    {darkMode ? '☀️' : '🌙'}
                  </span>
                  <span className="theme-toggle-text">
                    {darkMode ? 'Light' : 'Dark'}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Movie House. All rights reserved.</p>
          <div className="theme-info">
            {mounted && (
              <span>
                Current theme: <strong>{darkMode ? 'Dark Mode' : 'Light Mode'}</strong>
              </span>
            )}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout; 
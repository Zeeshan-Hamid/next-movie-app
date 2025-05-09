const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// MongoDB connection string
const uri = "mongodb+srv://zeeshanhamid17:$zee03052002@cluster0.aqabk0o.mongodb.net/";
const client = new MongoClient(uri);

async function seedDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('moviehouse');
    
    // Read the sample data
    const dataPath = path.join(__dirname, '../data/movies.json');
    console.log(`Reading data from: ${dataPath}`);
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    // Log data structure for debugging
    console.log(`Found ${data.movies?.length || 0} movies`);
    console.log(`Found ${data.genres?.length || 0} genres`);
    console.log(`Found ${data.directors?.length || 0} directors`);
    
    // Clear existing collections
    await db.collection('movies').deleteMany({});
    await db.collection('genres').deleteMany({});
    await db.collection('directors').deleteMany({});
    
    // Insert data
    if (data.movies && data.movies.length > 0) {
      await db.collection('movies').insertMany(data.movies);
      console.log(`Inserted ${data.movies.length} movies`);
      
      // Log a sample movie for debugging
      console.log('Sample movie:', data.movies[0]);
    }
    
    if (data.genres && data.genres.length > 0) {
      await db.collection('genres').insertMany(data.genres);
      console.log(`Inserted ${data.genres.length} genres`);
      
      // Log a sample genre for debugging
      console.log('Sample genre:', data.genres[0]);
    }
    
    if (data.directors && data.directors.length > 0) {
      await db.collection('directors').insertMany(data.directors);
      console.log(`Inserted ${data.directors.length} directors`);
      
      // Log a sample director for debugging
      console.log('Sample director:', data.directors[0]);
      
      // Get count of movies for each director
      for (const director of data.directors) {
        const movieCount = data.movies.filter(m => m.directorId === director.id).length;
        console.log(`Director ${director.name} has ${movieCount} movies`);
      }
    }
    
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seedDatabase(); 
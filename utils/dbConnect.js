import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (!uri) {
  throw new Error('MongoDB URI is not defined');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    console.log('Creating new MongoDB connection in development mode');
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect()
      .then(client => {
        console.log('MongoDB connected successfully in development mode');
        return client;
      })
      .catch(err => {
        console.error('Failed to connect to MongoDB in development mode:', err);
        throw err;
      });
  } else {
    console.log('Using existing MongoDB connection in development mode');
  }
  clientPromise = global._mongoClientPromise;
} else {
  console.log('Creating new MongoDB connection in production mode');
  client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .then(client => {
      console.log('MongoDB connected successfully in production mode');
      return client;
    })
    .catch(err => {
      console.error('Failed to connect to MongoDB in production mode:', err);
      throw err;
    });
}

export default clientPromise; 
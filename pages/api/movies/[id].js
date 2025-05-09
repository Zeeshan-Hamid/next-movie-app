import clientPromise from '../../../utils/dbConnect';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    
    const client = await clientPromise;
    const db = client.db("moviehouse");
    
    if (req.method === 'GET') {
      let movie;
      try {
        if (ObjectId.isValid(id)) {
          movie = await db.collection("movies").findOne({ _id: new ObjectId(id) });
        }
      } catch (error) {
        console.error("Error with ObjectId:", error);
      }
      
      if (!movie) {
        movie = await db.collection("movies").findOne({ id: id });
      }
      
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      
      res.status(200).json(movie);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 
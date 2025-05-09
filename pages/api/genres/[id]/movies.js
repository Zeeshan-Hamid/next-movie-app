import clientPromise from '../../../../utils/dbConnect';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    
    const client = await clientPromise;
    const db = client.db("moviehouse");
    
    if (req.method === 'GET') {
      let genre;
      try {
        if (ObjectId.isValid(id)) {
          genre = await db.collection("genres").findOne({ _id: new ObjectId(id) });
        }
      } catch (error) {
        console.error("Error with ObjectId:", error);
      }
      
      if (!genre) {
        genre = await db.collection("genres").findOne({ id: id });
      }
      
      if (!genre) {
        return res.status(404).json({ error: 'Genre not found' });
      }
      
      const genreId = genre._id ? genre._id.toString() : genre.id;
      const movies = await db.collection("movies").find({ genreId: genreId }).toArray();
      
      res.status(200).json(movies);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 
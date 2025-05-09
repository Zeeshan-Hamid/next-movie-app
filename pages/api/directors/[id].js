import clientPromise from '../../../utils/dbConnect';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    
    const client = await clientPromise;
    const db = client.db("moviehouse");
    
    if (req.method === 'GET') {
      let director;
      try {
        if (ObjectId.isValid(id)) {
          director = await db.collection("directors").findOne({ _id: new ObjectId(id) });
        }
      } catch (error) {
        console.error("Error with ObjectId:", error);
      }
      
      if (!director) {
        director = await db.collection("directors").findOne({ id: id });
      }
      
      if (!director) {
        return res.status(404).json({ error: 'Director not found' });
      }
      
      const mongoId = director._id ? director._id.toString() : null;
      const stringId = director.id;
      
      console.log(`Finding movies for director: ${director.name}, mongoId: ${mongoId}, stringId: ${stringId}`);
      
      const movies = await db.collection("movies").find({
        $or: [
          { directorId: stringId },
          ...(mongoId ? [{ directorId: mongoId }] : [])
        ]
      }).toArray();
      
      console.log(`Found ${movies.length} movies for director ${director.name}`);
      
      res.status(200).json({
        director,
        movies
      });
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 
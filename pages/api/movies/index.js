import clientPromise from '../../../utils/dbConnect';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("moviehouse");
    
    if (req.method === 'GET') {
      const movies = await db.collection("movies").find({}).toArray();
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
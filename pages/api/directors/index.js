import clientPromise from '../../../utils/dbConnect';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("moviehouse");
    
    if (req.method === 'GET') {
      const directors = await db.collection("directors").find({}).toArray();
      res.status(200).json(directors);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 
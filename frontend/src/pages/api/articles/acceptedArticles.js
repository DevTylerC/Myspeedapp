import dbConnect from '../../../../lib/dbConnect';
import AcceptedArticle from '../../../../models/AcceptedArticle';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === 'POST') {
    try {
      const newArticle = await AcceptedArticle.create(req.body);
      res.status(201).json({ success: true, data: newArticle });
    } catch (error) {
      console.error('Error creating accepted article:', error);
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

import dbConnect from '../../../../lib/dbConnect';
import Article from '../../../../models/Articles';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const article = await Article.findById(id);  // 根据 ID 查找文章
      if (!article) {
        return res.status(404).json({ success: false, message: 'Article not found' });
      }
      res.status(200).json({ success: true, data: article });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch article details', error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

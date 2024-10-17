import dbConnect from '../../../../lib/dbConnect';
import AcceptedArticle from '../../../../models/AcceptedArticle';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const article = await AcceptedArticle.findById(id);  // 根据 ID 查找文章
      if (!article) {
        return res.status(404).json({ success: false, message: 'Article not found' });
      }
      res.status(200).json({ success: true, data: article });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch article details', error });
    }
  } else if (req.method === 'PUT') {
    try {
      const updatedArticle = await AcceptedArticle.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedArticle) {
        return res.status(404).json({ success: false, message: 'Article not found' });
      }
      res.status(200).json({ success: true, data: updatedArticle });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to update article', error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

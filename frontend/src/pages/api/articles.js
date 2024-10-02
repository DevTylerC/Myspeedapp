import dbConnect from '../../../lib/dbConnect';
import Article from '../../../models/Articles';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const articleData = req.body;
      const { doi, title } = articleData;

      // Check for duplicates before saving
      const existingDOI = await Article.findOne({ doi });
      const existingTitle = await Article.findOne({ title });

      // Add checks for DOI and Title
      const doiCheck = !!existingDOI;
      const titleCheck = !!existingTitle;
      const similarDois = existingDOI ? [existingDOI.doi] : [];

      // Add the check information to article data
      const newArticleData = {
        ...articleData,
        doiCheck,
        titleCheck,
        similarDois,
      };

      // Save the article
      const newArticle = new Article(newArticleData);
      await newArticle.save();

      res.status(201).json({
        success: true,
        message: 'Article submitted successfully',
        data: newArticleData,
      });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.doi) {
        // If MongoDB duplicate key error occurs for DOI
        res.status(200).json({
          success: true,
          message: 'Article submitted successfully, but the DOI already exists',
          warning: 'Duplicate DOI found.',
        });
      } else {
        console.error('Error occurred during article submission:', error);
        res.status(500).json({ success: false, message: 'Failed to submit article', error });
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

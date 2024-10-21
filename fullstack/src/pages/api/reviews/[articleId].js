import { getClientIp } from 'request-ip'; // Used to get the user's IP address
import dbConnect from '../../../../lib/dbConnect';
import Review from '../../../../models/Review'; // Import Review model

// Connect to MongoDB


export default async function handler(req, res) {

  await dbConnect();
  
  const { method } = req;
  const { articleId } = req.query;
  
  // Retrieve user IP address
  const ipAddress = getClientIp(req) || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (method === 'GET') {
    // Handle GET request to fetch rating information
    try {
      const reviews = await Review.find({ articleId });
      if (reviews.length === 0) {
        // If no review data, return default values
        return res.status(200).json({ averageRating: 0, reviewCount: 0 });
      }
      
      // Calculate average rating
      const totalScore = reviews.reduce((sum, review) => sum + review.score, 0);
      const averageRating = totalScore / reviews.length;
      const reviewCount = reviews.length;
      
      res.status(200).json({ averageRating, reviewCount });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reviews' });
    }
  }

  if (method === 'POST') {
    // Handle POST request to submit a review
    const { score } = req.body;

    try {
      // Check if the current IP has already submitted a review
      const existingReview = await Review.findOne({ articleId, ipAddress });
      if (existingReview) {
        return res.status(400).json({ message: 'You have already reviewed this article.' });
      }

      // Create a new review
      const newReview = new Review({
        articleId,
        score,
        ipAddress,
      });

      await newReview.save();
      res.status(201).json({ message: 'Review submitted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error submitting review' });
    }
  }
}

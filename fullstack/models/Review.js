import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AcceptedArticle', 
    required: true,
  },
  reviewId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true, 
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 5, 
  },
  ipAddress: {
    type: String,
    required: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);

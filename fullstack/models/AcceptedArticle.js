import mongoose from 'mongoose';

const AcceptedArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [{ name: String, email: String }],
  journal: String,
  year: Number,
  doi: String,
  abstract: String,
  keywords: String,
  status: { type: String, enum: ['UnAnalyzed', 'Analyzed'], default: 'UnAnalyzed' },  // 只有 UnAnalyzed 和 Analyzed 两种状态
  createdAt: {
    type: Date,
    default: Date.now,
  },
  researchMethod: String,
  participants: String,
  supportsPractice: String,
  conclusion: String,
});

export default mongoose.models.AcceptedArticle || mongoose.model('AcceptedArticle', AcceptedArticleSchema);

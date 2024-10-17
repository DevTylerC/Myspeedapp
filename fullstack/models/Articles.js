import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [{ name: String, email: String }],
  journal: String,
  year: Number,
  doi: String,  // Remove the unique constraint
  abstract: String,
  keywords: String,
  doiCheck: Boolean,  // Field to store if DOI was checked
  titleCheck: Boolean,  // Field to store if Title was checked
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  similarDois: [String],  // Array to store similar DOIs
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);

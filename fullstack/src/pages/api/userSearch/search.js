import dbConnect from '../../../../lib/dbConnect';
import AcceptedArticle from '../../../../models/AcceptedArticle';

export default async function handler(req, res) {
  await dbConnect();

  const { title, authorName, yearStart, yearEnd, seMethod, simpleSearch } = req.query;
  const filter = { status: 'Analyzed' }; // Only include articles with status 'Analyzed'
  if (simpleSearch) {
    const regex = { $regex: simpleSearch, $options: 'i' }; // Case insensitive
    filter.$or = [
      { title: regex },
      { authors: { $elemMatch: { name: regex } } }, // Author name
      { supportsPractice: regex }, //  Modify this to match SE method
      { keywords: regex }
    ];
  } else {
    // Filtering conditions for advanced search
    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }

    if (authorName) {
      filter.authors = { $elemMatch: { name: { $regex: authorName, $options: 'i' } } };
    }

    // Add: Filter based on year range
    if (yearStart && yearEnd) {
      filter.createdAt = { $gte: new Date(`${yearStart}-01-01`), $lte: new Date(`${yearEnd}-12-31`) };
    }

    // Add: Filter based on SE method
    if (seMethod) {
      filter.supportsPractice = { $regex: seMethod, $options: 'i' };
    }
  }

  try {
    const articles = await AcceptedArticle.find(filter);
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving articles', error });
  }
}
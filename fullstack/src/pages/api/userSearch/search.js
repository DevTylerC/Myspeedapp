import dbConnect from '../../../../lib/dbConnect';
import AcceptedArticle from '../../../../models/AcceptedArticle';

export default async function handler(req, res) {
  await dbConnect();

  const { title, authorName, journal, doi, keywords, simpleSearch } = req.query;
  const filter = { status: 'Analyzed' }; // 只包括状态为 'Analyzed' 的文章

  if (simpleSearch) {
    const regex = { $regex: simpleSearch, $options: 'i' }; // 不区分大小写
    filter.$or = [
      { title: regex },
      { authors: { $elemMatch: { name: regex } } }, // 作者名
      { journal: regex },
      { doi: regex },
      { keywords: regex }
    ];
  } else {
    // 高级搜索的过滤条件
    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }

    if (authorName) {
      filter.authors = { $elemMatch: { name: { $regex: authorName, $options: 'i' } } };
    }

    if (journal) {
      filter.journal = { $regex: journal, $options: 'i' };
    }

    if (doi) {
      filter.doi = { $regex: doi, $options: 'i' };
    }

    if (keywords) {
      filter.keywords = { $regex: keywords, $options: 'i' };
    }
  }

  try {
    const articles = await AcceptedArticle.find(filter);
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving articles', error });
  }
}

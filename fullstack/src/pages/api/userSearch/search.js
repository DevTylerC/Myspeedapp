import dbConnect from '../../../../lib/dbConnect';
import AcceptedArticle from '../../../../models/AcceptedArticle';

export default async function handler(req, res) {
  await dbConnect();

  const { title, authorName, yearStart, yearEnd, seMethod, simpleSearch } = req.query;
  const filter = { status: 'Analyzed' }; // 只包括状态为 'Analyzed' 的文章

  if (simpleSearch) {
    const regex = { $regex: simpleSearch, $options: 'i' }; // 不区分大小写
    filter.$or = [
      { title: regex },
      { authors: { $elemMatch: { name: regex } } }, // 作者名
      { supportsPractice: regex }, // 修改此处以匹配SE方法
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

    // 新增：根据年份范围过滤
    if (yearStart && yearEnd) {
      filter.createdAt = { $gte: new Date(`${yearStart}-01-01`), $lte: new Date(`${yearEnd}-12-31`) };
    }

    // 新增：根据 SE 方法过滤
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
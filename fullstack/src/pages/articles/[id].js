import { useRouter } from 'next/router';
import ArticleDetailCard from '../../components/ArticleDetails/ArticleDetailCard';
import AuthorCard from '../../components/ArticleDetails/AuthorCard';
import { useState, useEffect } from 'react';

function ArticleDetail() {
  const router = useRouter();
  const { id } = router.query;  // 获取文章ID
  const [article, setArticle] = useState(null);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    if (id) {
      fetchArticleDetail(id);
    }
  }, [id]);

  const fetchArticleDetail = async (articleId) => {
    // 模拟文章详情数据
    const articleData = {
      title: 'AI in Medicine: Revolutionizing Healthcare',
      abstract: 'This article explores the application of AI technologies in healthcare...',
      submittedDate: '2024-09-12',
      doi: '10.1234/ai-medicine-2024',
    };

    const authorData = [
      { email: 'author1@example.com' },
      { email: 'author2@example.com' },
    ];

    setArticle(articleData);
    setAuthors(authorData);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Reviewer Article Detail Page</h1>
      <p className="text-center mb-6">Currently reviewing article with ID: {id}</p>

      {/* 如果文章数据还在加载，显示Loading状态 */}
      {!article ? (
        <p>Loading article details...</p>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          {/* 文章详情卡片 */}
          <div className="col-span-full sm:col-span-6 xl:col-span-8">
            <ArticleDetailCard
              title={article.title}
              abstract={article.abstract}
              submittedDate={article.submittedDate}
              doi={article.doi}
            />
          </div>

          {/* 作者信息卡片 */}
          <div className="col-span-full sm:col-span-6 xl:col-span-4">
            <AuthorCard authors={authors} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleDetail;

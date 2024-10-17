import { useRouter } from 'next/router';
import ArticleDetailCard from '../../components/ArticleDetails/ArticleDetailCard';
import AuthorCard from '../../components/ArticleDetails/AuthorCard';
import AnalysisCard from '../../components/ArticleDetails/AnalysisCard'; // 引入 AnalysisCard
import { useState, useEffect } from 'react';
import ReviewCard from '../../components/ReviewCard'; // 修复 ReviewCard 引用路径

function ArticleDetail() {
  const router = useRouter();
  const { id, authors } = router.query; // 移除与 CheckStatusCard 相关的 query 参数
  const [article, setArticle] = useState(null);
  const [authorList, setAuthorList] = useState([]);
  const [analysisData, setAnalysisData] = useState({
    researchMethod: null,
    participants: null,
    supportsPractice: null,
    conclusion: null,
  });

  useEffect(() => {
    if (id) {
      fetchArticleDetail(id);
    }

    if (authors) {
      try {
        const parsedAuthors = JSON.parse(decodeURIComponent(authors));
        setAuthorList(parsedAuthors);
      } catch (e) {
        console.error('Error parsing authors:', e);
      }
    }
  }, [id, authors]);

  const fetchArticleDetail = async (articleId) => {
    try {
      const response = await fetch(`/api/acceptedArticles/${articleId}`); // 调用后端 API
      if (!response.ok) {
        throw new Error('Failed to fetch article details');
      }
      const result = await response.json();
      setArticle(result.data); // 更新文章数据
    } catch (error) {
      console.error('Error fetching article details:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Analyst Article Detail Page</h1>
      <p className="text-center mb-6">Currently viewing article with ID: {id}</p>

      {/* 如果文章数据还在加载，显示 Loading 状态 */}
      {!article ? (
        <p>Loading article details...</p>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          {/* 文章详情卡片 */}
          <div className="col-span-full sm:col-span-6 xl:col-span-8">
            <ArticleDetailCard
              title={article.title}
              abstract={article.abstract}
              submittedDate={new Date(article.createdAt).toLocaleDateString()}
              journal={article.journal} // Add this line
              year={article.year} // Add this line
              doi={article.doi}
            />
          </div>

          {/* 作者信息卡片 */}
          <div className="col-span-full sm:col-span-6 xl:col-span-4">
            <AuthorCard authors={authorList} />
          </div>

          {/* 分析详情卡片 */}
          <div className="col-span-full">
            <AnalysisCard
              researchMethod={article.researchMethod}
              participants={article.participants}
              supportsPractice={article.supportsPractice}
              conclusion={article.conclusion}
              status={article.status}
              id={id}
            />
          </div>

          {/* 打分卡片：仅在 article.status 为 "Analyzed" 时显示 */}
          {article.status === 'Analyzed' && (
            <div className="col-span-full">
              <ReviewCard articleId={id} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ArticleDetail;

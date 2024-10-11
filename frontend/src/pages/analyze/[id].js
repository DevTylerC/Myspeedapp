import { useRouter } from 'next/router';
import ArticleDetailCard from '../../components/ArticleDetails/ArticleDetailCard';
import AuthorCard from '../../components/ArticleDetails/AuthorCard';
import AnalysisCard from '../../components/ArticleDetails/AnalysisCard'; // 引入 AnalysisCard
import { useState, useEffect } from 'react';

function ArticleDetail() {
  const router = useRouter();
  const { id, authors } = router.query; // 移除与 CheckStatusCard 相关的 query 参数
  const [article, setArticle] = useState(null);
  const [authorList, setAuthorList] = useState([]);
  const [analysisData, setAnalysisData] = useState({ // 存储分析数据
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
    // 模拟文章详情数据
    const articleData = {
      title: 'AI in Medicine: Revolutionizing Healthcare',
      abstract: 'This article explores the application of AI technologies in healthcare...',
      submittedDate: '2024-09-12',
      doi: '10.1234/ai-medicine-2024',
      status: 'UnAnalyzed', // 模拟文章状态：未分析
    };

    setArticle(articleData);
  };

  const handleSaveAnalysis = (analysisValues) => {
    setAnalysisData(analysisValues);
    setArticle({ ...article, status: 'Analyzed' });
    alert('Analysis data saved successfully!');
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
              submittedDate={article.submittedDate}
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
              researchMethod={analysisData.researchMethod}
              participants={analysisData.participants}
              supportsPractice={analysisData.supportsPractice}
              conclusion={analysisData.conclusion}
              status={article.status}
              onSave={handleSaveAnalysis}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleDetail;

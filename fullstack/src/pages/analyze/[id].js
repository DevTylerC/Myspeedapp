import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AnalysisCard from '../../components/ArticleDetails/AnalysisCard'; // Import AnalysisCard
import ArticleDetailCard from '../../components/ArticleDetails/ArticleDetailCard';
import AuthorCard from '../../components/ArticleDetails/AuthorCard';
import ReviewCard from '../../components/ReviewCard';

function ArticleDetail() {
  const router = useRouter();
  const { id, authors } = router.query; // Remove query parameters related to CheckStatusCard
  const [article, setArticle] = useState(null);
  const [authorList, setAuthorList] = useState([]);
  const [analysisData, setAnalysisData] = useState({ // Store analysis data
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
      const response = await fetch(`/api/acceptedArticles/${articleId}`);  // Call backend API
      if (!response.ok) {
        throw new Error('Failed to fetch article details');
      }
      const result = await response.json();
      setArticle(result.data);  // Update article data
    } catch (error) {
      console.error('Error fetching article details:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Analyst Article Detail Page</h1>
      <p className="text-center mb-6">Currently viewing article with ID: {id}</p>

      {/* If the article data is still loading, display the Loading state */}
      {!article ? (
        <p>Loading article details...</p>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          {/* Article detail card */}
          <div className="col-span-full sm:col-span-6 xl:col-span-8">
            <ArticleDetailCard
              title={article.title}
              abstract={article.abstract}
              submittedDate={new Date(article.createdAt).toLocaleDateString()}
              journal={article.journal}
              year={article.year}
              doi={article.doi}
            />
          </div>

          {/* Author information card */}
          <div className="col-span-full sm:col-span-6 xl:col-span-4">
            <AuthorCard authors={authorList} />
          </div>

          {/* Analysis detail card */}
          <div className="col-span-full">
            <AnalysisCard
              researchMethod={article.researchMethod}
              participants={article.participants}
              supportsPractice={article.supportsPractice}
              conclusion={article.conclusion}
              status={article.status}
              id = {id}
            />
          </div>
          {/* Rating card: Only displayed when article.status is "Analyzed" */}
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

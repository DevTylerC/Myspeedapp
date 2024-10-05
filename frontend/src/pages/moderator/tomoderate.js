import React, { useEffect, useState } from 'react';
import ArticleCard from '../../components/ArticleCard2';

const ToReview = () => {
  const [articlesToReview, setArticlesToReview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const result = await response.json();
        setArticlesToReview(result.data); // Set fetched articles to state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">Articles To Moderate</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          {articlesToReview.length > 0 ? (
            articlesToReview.map((article, index) => (
              <div key={index} className="col-span-full sm:col-span-6 xl:col-span-4">
                <ArticleCard
                  title={article.title}
                  authors={article.authors}
                  keywords={article.keywords}
                  // 使用 createdAt 作为 submissionDate
                  submissionDate={new Date(article.createdAt).toLocaleDateString()} 
                  status={article.status}
                  link={article._id}
                  doiCheck={article.doiCheck}
                  titleCheck={article.titleCheck}
                  similarDois={article.similarDois}
                />
              </div>
            ))
          ) : (
            <p className="text-center col-span-12">No articles to review yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ToReview;

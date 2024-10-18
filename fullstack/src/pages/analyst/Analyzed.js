import React, { useEffect, useState } from 'react';
import ArticleCard3 from '../../components/ArticleCard3';

const Analyzed = () => {
  const [articlesToAnalyze, setArticlesToAnalyze] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles/acceptedArticles?status=Analyzed'); // Adjust this path if needed
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const { data } = await response.json();
        setArticlesToAnalyze(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">Articles To Be Analyzed</h2>
      <div className="grid grid-cols-12 gap-6">
        {loading ? (
          <p className="text-center col-span-12">Loading articles...</p>
        ) : articlesToAnalyze.length > 0 ? (
          articlesToAnalyze.map((article) => (
            <div key={article._id} className="col-span-full sm:col-span-6 xl:col-span-4">
              <ArticleCard3
                title={article.title}
                authors={article.authors}
                keywords={article.keywords}
                submissionDate={article.createdAt}
                researchMethod={article.researchMethod}
                participants={article.participants}
                supportsPractice={article.supportsPractice}
                conclusion={article.conclusion}
                link={article._id}
              />
            </div>
          ))
        ) : (
          <p className="text-center col-span-12">No articles to analyze yet.</p>
        )}
      </div>
    </div>
  );
};

export default Analyzed;

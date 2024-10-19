import React, { useState } from 'react';
import ArticleCard3 from '../../src/components/ArticleCard3';

const Search = () => {
  const [articlesToAnalyze, setArticlesToAnalyze] = useState([]);
  const [loading, setLoading] = useState(false);
  const [useAdvancedSearch, setUseAdvancedSearch] = useState(false);

  // Simple search state
  const [simpleSearch, setSimpleSearch] = useState('');

  // Advanced search state
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [yearStart, setYearStart] = useState('');
  const [yearEnd, setYearEnd] = useState('');
  const [seMethod, setSeMethod] = useState('');

  // Sample SE methods options
  const seMethods = [
    "Agile Development",
    "Waterfall Model",
    "DevOps",
    "Test-Driven Development",
    "Continuous Integration",
    "Pair Programming",
    "Scrum"
  ];

  // Fetch articles for either search type
  const fetchArticles = async () => {
    if ((useAdvancedSearch && !title && !authorName && !yearStart && !yearEnd && !seMethod) || (!useAdvancedSearch && !simpleSearch)) {
      alert("Please Enter a search term.");
      return;
    }

    setLoading(true);
    try {
      let query;
      if (useAdvancedSearch) {
        // For advanced search
        query = new URLSearchParams({
          title,
          authorName,
          yearStart,
          yearEnd,
          seMethod
        }).toString();
      } else {
        // For simple search
        query = new URLSearchParams({
          simpleSearch: simpleSearch
        }).toString();
      }

      const response = await fetch(`/api/userSearch/search?${query}`);
      const data = await response.json();
      setArticlesToAnalyze(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Search Article</h2>

      {/* Toggle button to switch between simple and advanced search */}
      <div className="flex justify-center mb-6">
        <button
          className={`p-2 rounded ${useAdvancedSearch ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
          onClick={() => setUseAdvancedSearch(false)}
        >
          Simple Search
        </button>
        <button
          className={`p-2 ml-4 rounded ${useAdvancedSearch ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setUseAdvancedSearch(true)}
        >
          Advanced Search
        </button>
      </div>

      {/* Simple Search Form */}
      {!useAdvancedSearch && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search articles..."
            value={simpleSearch}
            onChange={(e) => setSimpleSearch(e.target.value)}
            className="p-2 w-full border border-gray-300 rounded mb-4"
          />
          <button
            onClick={fetchArticles}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Search
          </button>
        </div>
      )}

      {/* Advanced Search Form */}
      {useAdvancedSearch && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Author Name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Start Year"
            value={yearStart}
            onChange={(e) => setYearStart(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="End Year"
            value={yearEnd}
            onChange={(e) => setYearEnd(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <select
            value={seMethod}
            onChange={(e) => setSeMethod(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Select SE Method</option>
            {seMethods.map((method, index) => (
              <option key={index} value={method}>
                {method}
              </option>
            ))}
          </select>
          <button
            onClick={fetchArticles}
            className="p-2 bg-blue-500 text-white rounded col-span-full md:col-span-3 lg:col-span-5"
          >
            Search
          </button>
        </div>
      )}

      {/* Articles Display */}
      <div className="grid grid-cols-12 gap-6">
        {loading ? (
          <p className="text-center col-span-12 text-gray-600">Loading articles...</p>
        ) : articlesToAnalyze.length > 0 ? (
          articlesToAnalyze.map((article) => (
            <div key={article._id} className="col-span-full sm:col-span-6 xl:col-span-4 p-6 bg-white rounded-lg shadow-lg">
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
          <p className="text-center col-span-12 text-gray-600">No articles found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;

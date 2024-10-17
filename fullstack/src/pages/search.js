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
  const [journal, setJournal] = useState('');
  const [doi, setDoi] = useState('');
  const [keywords, setKeywords] = useState('');

  // Fetch articles for either search type
  const fetchArticles = async () => {
    // Check if there is any input before proceeding
    if ((useAdvancedSearch && !title && !authorName && !journal && !doi && !keywords) || (!useAdvancedSearch && !simpleSearch)) {
      /*
        该 if 条件确保用户必须在输入框中填写搜索条件，才能返回并检索相关的论文信息。
        否则，如果用户没有填写任何信息就直接点击 Search 按钮，
        系统将返回所有状态为 'Analyzed' 的论文。
        这样做是为了防止无条件搜索带来不必要的数据负载，同时允许在特定条件下返回所有状态为 'Analyzed' 的论文。
      */
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
          journal,
          doi,
          keywords
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
        type="text"
        placeholder="Journal"
        value={journal}
        onChange={(e) => setJournal(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="DOI"
        value={doi}
        onChange={(e) => setDoi(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Keywords"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
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


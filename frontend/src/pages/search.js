import React from 'react';
import ArticleCard from '../components/ArticleCard';

const Search = () => {
  const articles = [
    { title: 'Research Paper on AI', author: 'John Doe', keywords: 'AI, Machine Learning', submissionDate: '2024-09-01', type: 'Research Paper', link: '1' },
    { title: 'Case Study on Cloud Computing', author: 'Jane Smith', keywords: 'Cloud, AWS, Azure', submissionDate: '2024-09-02', type: 'Case Study', link: '2' },
    { title: 'Review on Cybersecurity Trends', author: 'Michael Lee', keywords: 'Cybersecurity, Trends, 2024', submissionDate: '2024-09-03', type: 'Review Article', link: '3' },
    { title: 'Experiment Report on Quantum Computing', author: 'Sara Connor', keywords: 'Quantum, Computing, Experiments', submissionDate: '2024-09-04', type: 'Experiment Report', link: '4' },
    // 其他数据...
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Search Results</h1>
      <div className="grid grid-cols-12 gap-6">
        {articles.map((article, index) => (
          <ArticleCard
            key={index}
            title={article.title}
            author={article.author}
            keywords={article.keywords}
            submissionDate={article.submissionDate}
            type={article.type}
            link={article.link}  // 传递ID作为动态参数
          />
        ))}
      </div>
    </div>
  );
};

export default Search;

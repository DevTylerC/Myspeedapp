import React from 'react';
import ArticleCard from '../components/ArticleCard';

const Search = () => {
  // 模拟的8个结果数据
  const articles = [
    { title: 'Research Paper on AI', author: 'John Doe', keywords: 'AI, Machine Learning', submissionDate: '2024-09-01', type: 'Research Paper', link: '/articleDetail/1' },
    { title: 'Case Study on Cloud Computing', author: 'Jane Smith', keywords: 'Cloud, AWS, Azure', submissionDate: '2024-09-02', type: 'Case Study', link: '/articleDetail/2' },
    { title: 'Review on Cybersecurity Trends', author: 'Michael Lee', keywords: 'Cybersecurity, Trends, 2024', submissionDate: '2024-09-03', type: 'Review Article', link: '/articleDetail/3' },
    { title: 'Experiment Report on Quantum Computing', author: 'Sara Connor', keywords: 'Quantum, Computing, Experiments', submissionDate: '2024-09-04', type: 'Experiment Report', link: '/articleDetail/4' },
    { title: 'Research Paper on Blockchain', author: 'Tom Hanks', keywords: 'Blockchain, Cryptocurrency', submissionDate: '2024-09-05', type: 'Research Paper', link: '/articleDetail/5' },
    { title: 'Case Study on DevOps', author: 'Emily Clark', keywords: 'DevOps, CI/CD', submissionDate: '2024-09-06', type: 'Case Study', link: '/articleDetail/6' },
    { title: 'Review on Software Testing', author: 'Robert Downey', keywords: 'Software Testing, Automation', submissionDate: '2024-09-07', type: 'Review Article', link: '/articleDetail/7' },
    { title: 'Experiment Report on Autonomous Vehicles', author: 'Chris Evans', keywords: 'Autonomous, Vehicles, AI', submissionDate: '2024-09-08', type: 'Experiment Report', link: '/articleDetail/8' },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Search Results</h1>
      {/* 一行显示3个卡片 */}
      <div className="grid grid-cols-12 gap-6">
        {articles.map((article, index) => (
          <ArticleCard
            key={index}
            title={article.title}
            author={article.author}
            keywords={article.keywords}
            submissionDate={article.submissionDate}
            type={article.type}
            link={article.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;

import React from 'react';
import ArticleCard3 from '../../components/ArticleCard3';

const ToAnalyze = () => {
  // 模拟待分析的文章数据，所有字段初始化为 `null`
  const articlesToAnalyze = [
    {
      title: 'AI and Healthcare: A Comprehensive Study',
      authors: [
        { name: 'Dr. John Smith', email: 'john.smith@example.com' },
        { name: 'Dr. Alice Brown', email: 'alice.brown@example.com' },
      ],
      keywords: 'AI, Healthcare, Study',
      submissionDate: '2024-08-15',
      researchMethod: 'Experiment',
      link: '101',
      participants: null, // 初始状态下所有字段都未填写
      supportsPractice: null,
      conclusion: null,
    },
    {
      title: 'Experimenting with 5G Technologies',
      authors: [{ name: 'Jane Doe', email: 'jane.doe@example.com' }],
      keywords: '5G, Networking, Experiment',
      submissionDate: '2024-08-20',
      researchMethod: 'Case Study',
      link: '102',
      participants: null,
      supportsPractice: null,
      conclusion: null,
    },
    {
      title: 'Case Study on Renewable Energy Adoption',
      authors: [
        { name: 'Sam Lee', email: 'sam.lee@example.com' },
        { name: 'Mike Johnson', email: 'mike.johnson@example.com' },
      ],
      keywords: 'Energy, Renewable, Case Study',
      submissionDate: '2024-08-25',
      researchMethod: null, // 未指定研究方法
      link: '103',
      participants: null,
      supportsPractice: null,
      conclusion: null,
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">Articles To Be Analyzed</h2>
      <div className="grid grid-cols-12 gap-6">
        {articlesToAnalyze.length > 0 ? (
          articlesToAnalyze.map((article, index) => (
            <div key={index} className="col-span-full sm:col-span-6 xl:col-span-4">
              <ArticleCard3
                title={article.title}
                authors={article.authors}
                keywords={article.keywords}
                submissionDate={article.submissionDate}
                researchMethod={article.researchMethod}
                participants={article.participants}
                supportsPractice={article.supportsPractice}
                conclusion={article.conclusion}
                link={article.link}
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

export default ToAnalyze;

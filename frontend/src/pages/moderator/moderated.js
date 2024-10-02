import React from 'react';
import ArticleCard from '../../components/ArticleCard2';

const Moderated = () => {
const articlesToReview = [
  {
    title: 'AI and Healthcare: A Comprehensive Study',
    authors: [
      { name: 'Dr. John Smith', email: 'john.smith@example.com' },
      { name: 'Dr. Alice Brown', email: 'alice.brown@example.com' }
    ],
    keywords: 'AI, Healthcare, Study',
    submissionDate: '2024-08-15',
    status: 'accepted',
    link: '101',
    doiCheck: true,
    titleCheck: false,
    similarDois: ['10.1234/healthcare-2022', '10.5678/health-ai-2023'],
  },
  {
    title: 'Experimenting with 5G Technologies',
    authors: [
      { name: 'Jane Doe', email: 'jane.doe@example.com' }
    ],
    keywords: '5G, Networking, Experiment',
    submissionDate: '2024-08-20',
    status: 'rejected',
    link: '102',
    doiCheck: false,
    titleCheck: false,
    similarDois: ['10.7890/5g-study-2021'],
  },
  {
    title: 'Case Study on Renewable Energy Adoption',
    authors: [
      { name: 'Sam Lee', email: 'sam.lee@example.com' },
      { name: 'Mike Johnson', email: 'mike.johnson@example.com' }
    ],
    keywords: 'Energy, Renewable, Case Study',
    submissionDate: '2024-08-25',
    status: 'accepted',
    link: '103',
    doiCheck: true,
    titleCheck: true,
    similarDois: [],
  },
];


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">Moderated Articles </h2>
      <div className="grid grid-cols-12 gap-6">
        {articlesToReview.length > 0 ? (
          articlesToReview.map((article, index) => (
            <div key={index} className="col-span-full sm:col-span-6 xl:col-span-4">
              <ArticleCard
                title={article.title}
                authors={article.authors}
                keywords={article.keywords}
                submissionDate={article.submissionDate}
                status={article.status}
                link={article.link}
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
    </div>
  );
};

export default Moderated;

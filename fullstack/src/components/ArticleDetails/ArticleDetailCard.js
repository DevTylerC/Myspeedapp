import React from 'react';

const ArticleDetailCard = ({ title, abstract, submittedDate, doi, journal, year }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="mb-4"><strong>Abstract:</strong> {abstract}</p>
      <p className="mb-2"><strong>Submitted Date:</strong> {submittedDate}</p>
      <p className="mb-2"><strong>Journal:</strong> {journal}</p>  {/* 添加 Journal */}
      <p className="mb-2"><strong>Year:</strong> {year}</p>        {/* 添加 Year */}
      <p className="mb-2">
        <strong>DOI:</strong> <a href={`https://doi.org/${doi}`} className="text-blue-600 hover:underline">{doi}</a>
      </p>
    </div>
  );
};

export default ArticleDetailCard;

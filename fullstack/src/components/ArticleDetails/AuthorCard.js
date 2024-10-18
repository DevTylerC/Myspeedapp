import React, { useState } from 'react';

const AuthorCard = ({ authors }) => {
  const [currentAuthorIndex, setCurrentAuthorIndex] = useState(0);

  const handleNextAuthor = () => {
    setCurrentAuthorIndex((prevIndex) => (prevIndex + 1) % authors.length);
  };

  const handlePreviousAuthor = () => {
    setCurrentAuthorIndex((prevIndex) => (prevIndex - 1 + authors.length) % authors.length);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-bold mb-2">Author Information</h3>
      {/* 显示作者名字 */}
      <p><strong>Name:</strong> {authors[currentAuthorIndex]?.name || 'No name available'}</p>
      {/* 显示作者邮箱 */}
      <p><strong>Email:</strong> {authors[currentAuthorIndex]?.email || 'No email available'}</p>
      
      <div className="flex justify-between mt-4">
        <button onClick={handlePreviousAuthor} className="bg-gray-300 px-4 py-2 rounded-md">Previous</button>
        <button onClick={handleNextAuthor} className="bg-gray-300 px-4 py-2 rounded-md">Next</button>
      </div>
    </div>
  );
};

export default AuthorCard;

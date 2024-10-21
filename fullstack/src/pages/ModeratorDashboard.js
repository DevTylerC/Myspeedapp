import { useState } from 'react';
import Reviewed from './moderator/moderated'; // Import Reviewed component
import ToReview from './moderator/tomoderate'; // Import ToReview component

const ReviewerDashboard = () => {
  const [activeTab, setActiveTab] = useState('ToReview'); // Display ToReview by default

  const renderContent = () => {
    switch (activeTab) {
      case 'ToReview':
        return <ToReview />; // Render ToReview component
      case 'Reviewed':
        return <Reviewed />; // Render Reviewed component
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Moderator Dashboard</h1>

      {/* Toggle buttons */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-wrap -space-x-px w-1/2">
          <button
            className={`btn flex-1 text-center py-2 ${
              activeTab === 'ToReview'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border'
            }`}
            onClick={() => setActiveTab('ToReview')}
          >
            To moderate
          </button>
          <button
            className={`btn flex-1 text-center py-2 ${
              activeTab === 'Reviewed'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border'
            }`}
            onClick={() => setActiveTab('Reviewed')}
          >
            moderated
          </button>
        </div>
      </div>

      {/* Toggle display of different content based on button click */}
      <div className="mb-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default ReviewerDashboard;

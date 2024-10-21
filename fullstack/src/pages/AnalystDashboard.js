import { useState } from 'react';
import Analyzed from './analyst/Analyzed'; // Import Analyzed component
import ToAnalyze from './analyst/ToAnalyze'; // Import ToAnalyze component

const AnalystDashboard = () => {
  const [activeTab, setActiveTab] = useState('ToAnalyze'); // Default selection is "ToAnalyze"
  // Render different content based on the active Tab
  const renderContent = () => {
    switch (activeTab) {
      case 'ToAnalyze':
        return <ToAnalyze />;
      case 'Analyzed':
        return <Analyzed />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Analyst Dashboard</h1>

      {/* Toggle buttons */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-wrap -space-x-px w-1/2">
          {/* ToAnalyze button */}
          <button
            className={`btn flex-1 text-center py-2 ${
              activeTab === 'ToAnalyze'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border'
            }`}
            onClick={() => setActiveTab('ToAnalyze')}
          >
            To Analyze
          </button>

          {/* Analyzed button */}
          <button
            className={`btn flex-1 text-center py-2 ${
              activeTab === 'Analyzed'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border'
            }`}
            onClick={() => setActiveTab('Analyzed')}
          >
            Analyzed
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

export default AnalystDashboard;

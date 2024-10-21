import { useState } from 'react';
import Intro from './intro'; // Import Intro component
import Search from './search'; // Import Search component
import Submit from './submit'; // Import Submit component

const Home = () => {
  const [activeTab, setActiveTab] = useState('Search'); // Display SPEED introduction by default

  const renderContent = () => {
    switch (activeTab) {
      case 'Intro':
        return <Intro />; // Render external Intro component
      case 'Search':
        return <Search />; // Render external Search component
      case 'Upload':
        return <Submit />; // Render external Submit component
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-blue-100 min-h-screen"> 
      <h1 className="text-2xl font-bold mb-4 text-center">SPEED</h1>

      {/* Toggle buttons */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-wrap -space-x-px w-1/2"> 
          <button
            className={`btn flex-1 text-center py-2 ${
              activeTab === 'Intro'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border'
            }`}
            onClick={() => setActiveTab('Intro')}
          >
            Intro
          </button>
          <button
            className={`btn flex-1 text-center py-2 ${
              activeTab === 'Search'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border'
            }`}
            onClick={() => setActiveTab('Search')}
          >
            Search Article
          </button>
          <button
            className={`btn flex-1 text-center py-2 ${
              activeTab === 'Upload'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border'
            }`}
            onClick={() => setActiveTab('Upload')}
          >
            Upload
          </button>
        </div>
      </div>

      
      <div className="mb-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default Home;

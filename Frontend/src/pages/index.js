import { useState } from 'react';
import Search from './search';  // 导入 Search 组件
import Submit from './submit';  // 导入 Submit 组件

const Home = () => {
  const [activeTab, setActiveTab] = useState('Intro'); // 默认显示SPEED简介

  const renderContent = () => {
    switch (activeTab) {
      case 'Intro':
        return <div>SPEED简介内容...</div>;
      case 'Search':
        return <Search />; // 调用外部 Search 组件
      case 'Upload':
        return <Submit />; // 调用外部 Submit 组件
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-blue-100 min-h-screen"> {/* 将背景设置为浅蓝色 */}
      <h1 className="text-2xl font-bold mb-4 text-center">SPEED</h1>

      {/* 切换按钮 */}
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

      {/* 根据按钮切换显示不同的内容 */}
      <div className="mb-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default Home;

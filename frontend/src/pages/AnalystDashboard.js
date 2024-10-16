import { useState } from 'react';
import ToAnalyze from './analyst/ToAnalyze'; // 引入 ToAnalyze 组件
import Analyzed from './analyst/Analyzed';   // 引入 Analyzed 组件

const AnalystDashboard = () => {
  const [activeTab, setActiveTab] = useState('ToAnalyze'); // 默认选择 "ToAnalyze"

  // 根据当前激活的 Tab 渲染不同的内容
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

      {/* 切换按钮 */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-wrap -space-x-px w-1/2">
          {/* ToAnalyze 按钮 */}
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

          {/* Analyzed 按钮 */}
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

      {/* 根据按钮切换显示不同的内容 */}
      <div className="mb-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default AnalystDashboard;

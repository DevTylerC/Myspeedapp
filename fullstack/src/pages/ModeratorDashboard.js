import { useState } from 'react';
import ToReview from './moderator/tomoderate';  // 导入 ToReview 组件
import Reviewed from './moderator/moderated';  // 导入 Reviewed 组件

const ReviewerDashboard = () => {
  const [activeTab, setActiveTab] = useState('ToReview'); // 默认显示 ToReview

  const renderContent = () => {
    switch (activeTab) {
      case 'ToReview':
        return <ToReview />; // 调用 ToReview 组件
      case 'Reviewed':
        return <Reviewed />; // 调用 Reviewed 组件
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Moderator Dashboard</h1>

      {/* 切换按钮 */}
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

      {/* 根据按钮切换显示不同的内容 */}
      <div className="mb-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default ReviewerDashboard;

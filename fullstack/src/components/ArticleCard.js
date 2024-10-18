import React from 'react';
import Link from 'next/link';

function ArticleCard({ title, author, keywords, submissionDate, type, link }) {

  // 根据文章类型返回不同的颜色样式
  const typeColor = (type) => {
    switch (type) {
      case 'Research Paper':
        return 'bg-blue-500 text-blue-50';
      case 'Experiment Report':
        return 'bg-green-500 text-green-50';
      case 'Review Article':
        return 'bg-yellow-500 text-yellow-50';
      case 'Case Study':
        return 'bg-purple-500 text-purple-50';
      default:
        return 'bg-slate-500 text-slate-50';
    }
  };

  // 处理打开新窗口的函数
  const handleOpenInNewWindow = (e) => {
    e.preventDefault();  // 阻止默认行为
    window.open(`/articles/${link}`, '_blank', 'noopener,noreferrer');  // 打开新窗口
  };

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="flex flex-col h-full p-5">
        <header>
          <div className="flex items-center justify-between">
            {/* 动态颜色的图标 */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${typeColor(type)}`}>
              <svg className="w-9 h-9 fill-current" viewBox="0 0 36 36">
                <path d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z" />
              </svg>
            </div>
          </div>
        </header>
        <div className="grow mt-2">
          {/* 用 onClick 事件打开新窗口 */}
          <h2 
            className="text-xl leading-snug font-semibold text-slate-800 dark:text-slate-100 hover:text-slate-900 dark:hover:text-white mb-1 cursor-pointer" 
            onClick={handleOpenInNewWindow}
          >
            {title}
          </h2>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {author.length > 20 ? author.slice(0, 20) + '...' : author}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {keywords.length > 30 ? keywords.slice(0, 30) + '...' : keywords}
          </div>
        </div>
        <footer className="mt-5">
          <div className="text-sm font-medium text-slate-500 mb-2">Submission Date: {submissionDate}</div>
          <div className="flex justify-between items-center">
            <div>
              <div className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 ${typeColor(type)}`}>{type}</div>
            </div>
            <div>
              {/* 添加一个 onClick 来在新窗口打开 View 链接 */}
              <span 
                className="text-sm font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                onClick={handleOpenInNewWindow}
              >
                View -&gt;
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ArticleCard;

import React from 'react';
import Link from 'next/link';

function ArticleCard({ title, authors, keywords, submissionDate, status, link }) {

  const statusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-500 text-white';
      case 'rejected':
        return 'bg-red-500 text-white';
      case 'pending':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // 处理在新窗口中打开链接的函数，去除了 doiCheck 和 titleCheck
  const handleOpenInNewWindow = (e) => {
    e.preventDefault();
    const authorString = encodeURIComponent(JSON.stringify(authors)); // 将多个作者信息编码成字符串
    const url = `/moderate/${link}?authors=${authorString}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="flex flex-col h-full p-5">
        <header>
          <div className="flex items-center justify-between">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${statusColor(status)}`}>
              <svg className="w-9 h-9 fill-current" viewBox="0 0 36 36">
                <path d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z" />
              </svg>
            </div>
          </div>
        </header>
        <div className="grow mt-2">
          {/* 修改为展示多个作者的名字或其他信息 */}
          <h2
            className="text-xl leading-snug font-semibold text-slate-800 dark:text-slate-100 hover:text-slate-900 dark:hover:text-white mb-1 cursor-pointer"
            onClick={handleOpenInNewWindow}
          >
            {title}
          </h2>
          {/* 渲染多个作者名字 */}
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {authors.map((author, index) => (
              <div key={index}>
                {author.name.length > 20 ? author.name.slice(0, 20) + '...' : author.name}
              </div>
            ))}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {keywords.length > 30 ? keywords.slice(0, 30) + '...' : keywords}
          </div>
        </div>
        <footer className="mt-5">
          <div className="text-sm font-medium text-slate-500 mb-2">Submission Date: {submissionDate}</div>
          <div className="flex justify-between items-center">
            <div>
              <div className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 ${statusColor(status)}`}>{status}</div>
            </div>
            <div>
              <span className="text-sm font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer" onClick={handleOpenInNewWindow}>
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

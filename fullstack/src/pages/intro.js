import React from 'react';
import { useRouter } from 'next/router'; // 使用 next/router 来实现页面跳转

const Intro = () => {
  const router = useRouter();

  // 跳转到分析员登录页面
  const handleLogin = (role) => {
    if (role === 'analyst') {
      router.push('/AnalystLogin'); // 跳转到Analyst登录页面
    } else if (role === 'moderator') {
      router.push('/ModeratorLogin'); // 跳转到Reviewer登录页面
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {/* 欢迎横幅 */}
      <div className="bg-blue-500 text-white p-4 rounded-lg mb-6 text-center">
        <h1 className="text-2xl font-bold">Welcome to SPEED</h1>
        <p className="mt-2">
          The Software Practice Empirical Evidence Database (SPEED) is a platform designed to facilitate the management and analysis of empirical data in software engineering research.
        </p>
      </div>

      {/* 登录卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 分析员登录卡片 */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Analyst Login</h2>
          <p className="mb-4">Log in as an Analyst to access research data, perform analyses, and generate reports.</p>
          <button
            onClick={() => handleLogin('analyst')}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Log in as Analyst
          </button>
        </div>

        {/* 审稿人登录卡片 */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Moderator Login</h2>
          <p className="mb-4">Log in as a moderator to enter papers.</p>
          <button
            onClick={() => handleLogin('moderator')}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Log in as moderator
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro;

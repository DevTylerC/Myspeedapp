import React, { useState } from 'react';
import { useRouter } from 'next/router';  // 导入 useRouter 来进行跳转

const ReviewerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();  // 初始化 router

  const handleLogin = (e) => {
    e.preventDefault();
    // 假设这里执行了一些验证逻辑，如果验证成功
    console.log('Logging in as Reviewer:', { email, password });

    // 跳转到审稿人 Dashboard
    router.push('/ModeratorDashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Moderator Login</h1>
        <p className="text-center mb-6">Log in to moderate submitted papers.</p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Log in as Moderator
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewerLogin;

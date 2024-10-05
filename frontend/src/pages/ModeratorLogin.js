import React, { useState } from 'react';
import { useRouter } from 'next/router';

const ModeratorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to track error messages
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
      role: 'moderator', // Add role for moderator
    };

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // 保存 JWT token
        setErrorMessage(''); // Clear any previous error messages

        // Redirect to Moderator Dashboard
        router.push('/ModeratorDashboard'); 
      } else {
        const data = await response.json();
        setErrorMessage(data.message); // Set error message from response
      }      
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Moderator Login</h1>
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
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p> // Display error message
          )}
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

export default ModeratorLogin;

import React, { useState } from 'react';
import { useRouter } from 'next/router';

const AnalystLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to track error messages
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
      role: 'analyst',
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
        // Clear the error message if login is successful
        setErrorMessage('');
        // Redirect to Analyst Dashboard
        router.push('/AnalystDashboard');
      } else {
        // If the response is not ok, set the error message
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      // In case of a network or server error, set a generic error message
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Analyst Login</h1>
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
            Log in as Analyst
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnalystLogin;

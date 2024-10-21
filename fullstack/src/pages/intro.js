import { useRouter } from 'next/router'; // Use next/router to handle page navigation

const Intro = () => {
  const router = useRouter();

  // Navigate to Analyst login page
  const handleLogin = (role) => {
    if (role === 'analyst') {
      router.push('/AnalystLogin'); // Navigate to Analyst login page
    } else if (role === 'moderator') {
      router.push('/ModeratorLogin'); // Navigate to Reviewer login page
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {/* Welcome banner */}
      <div className="bg-blue-500 text-white p-4 rounded-lg mb-6 text-center">
        <h1 className="text-2xl font-bold">Welcome to SPEED</h1>
        <p className="mt-2">
          The Software Practice Empirical Evidence Database (SPEED) is a platform designed to facilitate the management and analysis of empirical data in software engineering research.
        </p>
      </div>

      {/* Login card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Analyst login card */}
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

        {/* Reviewer login card */}
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

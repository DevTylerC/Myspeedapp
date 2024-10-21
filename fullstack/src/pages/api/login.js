import dotenv from 'dotenv';
// Load environment variables
dotenv.config({ path: '.env.local' });
// API route for handling login requests
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { email, password, role } = req.body;
  
      // Validate the user's email and password along with their role here
      const validUser = await checkUserCredentials(email, password, role);
  
      if (validUser) {
        // If validation succeeds, return login success message
        return res.status(200).json({ message: 'Login successful', role });
      } else {
        // If credentials are invalid, return a 401 error
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      // If the request is not a POST request, return a 405 error
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  
  // Example: Validate user credentials, replace this sample code with database logic
  async function checkUserCredentials(email, password, role) {
    // Assume you have a set of hardcoded user data
    const users = [
      { email: 'analyst@autuni.ac.nz', password: process.env.LOGIN_PASS, role: 'analyst' },
      { email: 'moderator@autuni.ac.nz', password: process.env.LOGIN_PASS, role: 'moderator' }
    ];
  
    // Validate the user's email, password, and role
    const user = users.find(user => user.email === email && user.password === password && user.role === role);
  
    return user ? true : false;
  }
  
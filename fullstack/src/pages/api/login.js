// 处理登录请求的 API 路由
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { email, password, role } = req.body;
  
      // 在这里验证用户的 email 和 password，以及他们的角色
      const validUser = await checkUserCredentials(email, password, role);
  
      if (validUser) {
        // 验证成功，返回登录成功的信息
        return res.status(200).json({ message: 'Login successful', role });
      } else {
        // 如果凭据无效，返回 401 错误
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      // 如果不是 POST 请求，返回 405 错误
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  
  // 例子：验证用户凭据，使用数据库逻辑代替此处的示例代码
  async function checkUserCredentials(email, password, role) {
    // 假设你有一组硬编码的用户数据
    const users = [
      { email: 'analyst@example.com', password: 'password123', role: 'analyst' },
      { email: 'moderator@example.com', password: 'password123', role: 'moderator' }
    ];
  
    // 验证用户的 email, password 和 role
    const user = users.find(user => user.email === email && user.password === password && user.role === role);
  
    return user ? true : false;
  }
  
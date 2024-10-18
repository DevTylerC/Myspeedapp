import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { recipients, subject, message } = req.body;
      console.log('Sending email to:', recipients); // Log recipients to verify
      console.log('Email subject:', subject);
      console.log('Email message:', message);
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: '"SPEED Notification" <noreply@speed.com>',
        to: recipients.join(', '), // Join recipients if it's an array
        subject: subject,
        text: message,
      };
  
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response); // Confirm email sent
        res.status(200).json({ message: 'Email sent successfully' });
      } catch (error) {
        console.error('Error sending email:', error); // Log any errors
        res.status(500).json({ error: 'Failed to send email' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  
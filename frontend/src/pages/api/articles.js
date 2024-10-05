import dbConnect from '../../../lib/dbConnect';
import Article from '../../../models/Articles';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const articleData = req.body;
      const { doi, title, authors, journal, year } = articleData;

      // Check for duplicates before saving
      const existingDOI = await Article.findOne({ doi });
      const existingTitle = await Article.findOne({ title });

      // Add checks for DOI and Title
      const doiCheck = !!existingDOI;
      const titleCheck = !!existingTitle;
      const similarDois = existingDOI ? [existingDOI.doi] : [];

      // Add the check information to article data
      const newArticleData = {
        ...articleData,
        doiCheck,
        titleCheck,
        similarDois,
        status: 'pending',
      };

      // Save the article
      const newArticle = new Article(newArticleData);
      await newArticle.save();

      // After saving, send an email notification to the moderator
      const transporter = nodemailer.createTransport({
        service: 'gmail', // Replace with your email service
        auth: {
          user: process.env.EMAIL_USER, // Your email user from environment variables
          pass: process.env.EMAIL_PASS, // Your email password from environment variables
        },
      });

      // Email content
      const authorsList = authors.map(author => `${author.name} <${author.email}>`).join(', ');
      const message = `
        A new article has been submitted for moderation:
        
        Title: ${title}
        Authors: ${authorsList}
        Journal: ${journal}
        Year: ${year}
        DOI: ${doi}

        Please review the submission in the SPEED moderation queue.
      `;

      // Send email to the moderator
      await transporter.sendMail({
        from: '"SPEED Notification" <noreply@speed.com>',
        to: 'jingzhaopiao@gmail.com', // Moderator's email
        subject: 'New Article Submission for Moderation',
        text: message,
      });

      // Respond to the frontend
      res.status(201).json({
        success: true,
        message: 'Article submitted successfully and the moderator has been notified!',
        data: newArticleData,
      });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.doi) {
        // If MongoDB duplicate key error occurs for DOI
        res.status(200).json({
          success: true,
          message: 'Article submitted successfully, but the DOI already exists',
          warning: 'Duplicate DOI found.',
        });
      } else {
        console.error('Error occurred during article submission:', error);
        res.status(500).json({ success: false, message: 'Failed to submit article', error });
      }
    }
  } else if (req.method === 'GET') {
    try {
      // Retrieve articles with 'pending' status
      const pendingArticles = await Article.find({ status: 'pending' }).select(
        'title authors journal year doi abstract keywords status createdAt'
      );
      res.status(200).json({ success: true, data: pendingArticles });
    } catch (error) {
      console.error('Error fetching articles:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch articles', error });
    }
  }
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

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
  } 
  else if (req.method === 'GET') {
    const { status } = req.query; // 从请求查询参数中获取 status
    
    // 检查是否存在多个状态值
    const statusArray = status ? status.split(',') : []; // 将状态值转换为数组
  
    try {
      // 使用 $in 运算符过滤文章
      const articles = await Article.find({ status: { $in: statusArray } }).select(
        'title authors journal year doi abstract keywords status createdAt'
      );
      res.status(200).json({ success: true, data: articles });
    } catch (error) {
      console.error('Error fetching articles:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch articles', error });
    }
  }  
  else if (req.method === 'PUT') {
    const { id } = req.body; // 获取文章 ID
    const { status } = req.body; // 获取要更新的 status

    try {
      // 更新文章状态
      const updatedArticle = await Article.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true } // 返回更新后的文档，并验证数据
      );

      if (!updatedArticle) {
        return res.status(404).json({ success: false, message: 'Article not found' });
      }

      res.status(200).json({
        success: true,
        message: 'Article status updated successfully',
        data: updatedArticle,
      });
    } catch (error) {
      console.error('Error updating article status:', error);
      res.status(500).json({ success: false, message: 'Failed to update article status', error });
    }
  } 
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

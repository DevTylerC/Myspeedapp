import mongoose from 'mongoose';
import Review from '../../../../models/Review'; // 引入 Review 模型
import { getClientIp } from 'request-ip'; // 用于获取用户 IP 地址
import dbConnect from '../../../../lib/dbConnect';

// 连接 MongoDB


export default async function handler(req, res) {

  await dbConnect();
  
  const { method } = req;
  const { articleId } = req.query;
  
  // 获取用户 IP 地址
  const ipAddress = getClientIp(req) || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (method === 'GET') {
    // 处理 GET 请求，获取评分信息
    try {
      const reviews = await Review.find({ articleId });
      if (reviews.length === 0) {
        // 如果没有评论数据，返回默认值
        return res.status(200).json({ averageRating: 0, reviewCount: 0 });
      }
      
      // 计算平均评分
      const totalScore = reviews.reduce((sum, review) => sum + review.score, 0);
      const averageRating = totalScore / reviews.length;
      const reviewCount = reviews.length;
      
      res.status(200).json({ averageRating, reviewCount });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reviews' });
    }
  }

  if (method === 'POST') {
    // 处理 POST 请求，提交评论
    const { score } = req.body;

    try {
      // 检查当前 IP 是否已经评论过
      const existingReview = await Review.findOne({ articleId, ipAddress });
      if (existingReview) {
        return res.status(400).json({ message: 'You have already reviewed this article.' });
      }

      // 创建新的评论
      const newReview = new Review({
        articleId,
        score,
        ipAddress,
      });

      await newReview.save();
      res.status(201).json({ message: 'Review submitted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error submitting review' });
    }
  }
}

import React, { useState, useEffect } from 'react';

const ReviewCard = ({ articleId }) => {
  const [rating, setRating] = useState(0); // 用户的评分
  const [hoverRating, setHoverRating] = useState(0); // 悬停时的评分
  const [averageRating, setAverageRating] = useState(0); // 平均评分
  const [reviewCount, setReviewCount] = useState(0); // 评论数量

  useEffect(() => {
    // 获取当前文章的评分信息
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews/${articleId}`);
        const data = await response.json();
        setAverageRating(data.averageRating);
        setReviewCount(data.reviewCount);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    if (articleId) {
      fetchReviews();
    }
  }, [articleId]);

  const handleRating = async (index) => {
    try {
      const response = await fetch(`/api/reviews/${articleId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score: index }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Review submitted successfully!');
        // 更新评论数据
        setRating(index);
        setReviewCount(reviewCount + 1);
        setAverageRating((averageRating * reviewCount + index) / (reviewCount + 1));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const stars = Array(5).fill(0); // 创建星星数组

  return (
    <div className="max-w-sm p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Rate this Article</h3>

      {/* 显示星星 */}
      <div className="flex items-center space-x-1">
        {stars.map((_, index) => (
          <svg
            key={index}
            className={`w-8 h-8 cursor-pointer ${
              hoverRating >= index + 1 || rating >= index + 1
                ? 'text-blue-500'
                : 'text-transparent'
            } border border-blue-500`}
            fill="currentColor"
            stroke="currentColor"
            onMouseEnter={() => setHoverRating(index + 1)} // 鼠标悬停改变评分
            onMouseLeave={() => setHoverRating(0)} // 鼠标移开后恢复
            onClick={() => handleRating(index + 1)} // 点击确定评分
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>

      {/* 显示评论数和平均分 */}
      <div className="mt-2 text-gray-700">
        <span className="font-semibold text-lg">
          {hoverRating ? hoverRating : averageRating.toFixed(1)}
        </span>{' '}
        / 5 ({reviewCount} reviews)
      </div>
    </div>
  );
};

export default ReviewCard;

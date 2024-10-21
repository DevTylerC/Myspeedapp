import { useEffect, useState } from 'react';

const ReviewCard = ({ articleId }) => {
  const [rating, setRating] = useState(0); // User's rating
  const [hoverRating, setHoverRating] = useState(0); // Hover rating
  const [averageRating, setAverageRating] = useState(0); // Average rating
  const [reviewCount, setReviewCount] = useState(0); // Review count

  useEffect(() => {
    // Fetch the rating information for the current article
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
        // Update review data
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

  const stars = Array(5).fill(0); // Create an array of stars

  return (
    <div className="max-w-sm p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Rate this Article</h3>

      {/* Display stars */}
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
            onMouseEnter={() => setHoverRating(index + 1)} // Change rating on hover
            onMouseLeave={() => setHoverRating(0)} // Reset after mouse leaves
            onClick={() => handleRating(index + 1)} // Click to confirm rating
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>

      {/* Display review count and average rating */}
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

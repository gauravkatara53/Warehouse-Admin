import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

interface Review {
  id: string;
  userImage: string;
  userName: string;
  date: string;
  content: string;
  rating: number; // Added rating property
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { userImage, userName, date, content, rating } = review;

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, index) => (
          <FontAwesomeIcon
            key={`full-${index}`}
            icon={faStar}
            className="h-5 w-5 text-yellow-400"
          />
        ))}
        {hasHalfStar && (
          <FontAwesomeIcon
            icon={faStarHalfAlt}
            className="h-5 w-5 text-yellow-400"
          />
        )}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <FontAwesomeIcon
            key={`empty-${index}`}
            icon={faStar}
            className="h-5 w-5 text-gray-300"
          />
        ))}
        <span className="ml-2 text-gray-600 text-sm">({rating})</span>
      </div>
    );
  };

  return (
    <div className="flex bg-gray-100 pt-4 p-2 rounded-md border gap-4 my-4">
      <div className="flex flex-col items-center w-24">
        <img
          src={userImage}
          alt={userName}
          className="w-16 h-16 mb-2 border rounded-lg border-gray-300"
        />
        <p className="text-gray-900 text-sm font-medium text-center">
          {userName}
        </p>
      </div>
      <div className="flex-1 mt-2 mr-2">
        <p className="text-gray-500 text-sm">{content}</p>
        <div className="flex justify-between items-center mt-2 mb-2">
          <h3 className="text-sm text-gray-500">{date}</h3>
          {renderStars(rating)}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

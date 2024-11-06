// ReviewCard.tsx
import React from "react";

interface Review {
  id: string;
  userImage: string;
  userName: string;
  date: string;
  title: string;
  content: string;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="flex bg-gray-100 p-4 pl-2 rounded-md border  gap-4  my-4">
      <div className="flex flex-col items-center">
        <img
          src={review.userImage}
          alt={review.userName}
          className="w-12 h-12 rounded-sm mb-2"
        />
        <p className="text-gray-900 text-sm font-medium">{review.userName}</p>
        <p className="text-gray-500 text-xs">{review.date}</p>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-800">{review.title}</h3>
        <p className="text-gray-500">{review.content}</p>
      </div>
    </div>
  );
};

export default ReviewCard;

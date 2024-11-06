import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ReviewCard from "./ReviewCard";
import reviewsData from "../../../../../Data/WPReviewsData";
import Pagination from "@/Components/Common/Pagination/Pagination";

interface Price {
  title: string;
  amount: number;
  discount: number;
  _id: string;
}

interface Warehouse {
  _id: string;
  name: string;
  about: string;
  price: Price[];
  location: {
    type: string;
    coordinates: [number, number];
  };
  rentOrSell: "Rent" | "Sell";
  warehouseAddress: string;
  imageUrl?: string;
  phone: string;
  createdAt: string;
  bookings: string;
}

interface RecentReviewsProps {
  warehouse?: Warehouse;
  onBackClick: () => void;
}

const RecentReviews: React.FC<RecentReviewsProps> = ({
  warehouse,
  onBackClick,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6; // Set the number of reviews per page

  // Calculate the current reviews to display
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviewsData.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  // Calculate total pages
  const totalPages = Math.ceil(reviewsData.length / reviewsPerPage);

  return (
    <div className="flex flex-col min-h-screen pt-10 px-4">
      <div className="self-start mb-4">
        <button className="text-gray-600" onClick={onBackClick}>
          <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />
        </button>
      </div>

      <div className="p-2 w-full max-w-4xl mx-auto flex flex-col gap-6 bg-white rounded-md">
        <h2 className="text-2xl font-medium text-gray-800 mt-4 ml-2 -mb-4">
          {warehouse?.name} - Reviews
        </h2>

        <div className="pt-0 p-8">
          {currentReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
      {/* Pagination Component */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default RecentReviews;

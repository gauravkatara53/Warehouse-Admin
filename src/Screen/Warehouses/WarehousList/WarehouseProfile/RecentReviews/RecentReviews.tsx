import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ReviewCard from "./ReviewCard";
import Pagination from "@/Components/Common/Pagination/Pagination";
import apiService from "@/Components/APIService/apiService";
import { ClipLoader } from "react-spinners";

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

interface Review {
  _id: string;
  businessProfileDocId: string;
  userDocId: string;
  customerName: string;
  customerProfiles: string;
  feedback: string;
  images: string[];
  rating: number;
  createdAt: string;
}

interface RecentReviewsProps {
  warehouse?: Warehouse;
  onBackClick: () => void;
}

const RecentReviews: React.FC<RecentReviewsProps> = ({
  warehouse,
  onBackClick,
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const reviewsPerPage = 10; // Set the number of reviews per page

  useEffect(() => {
    const fetchReviews = async () => {
      if (!warehouse) return;
      setLoading(true);
      try {
        const response = await apiService.get<{
          success: boolean;
          data: Review[];
        }>(`/ratings/admin-particular-warehouse`, {
          warehouseDocId: warehouse._id,
        });
        if (response?.success) {
          setReviews(response.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [warehouse]);

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <div className="flex flex-col min-h-screen pt-10 px-4">
      <div className="self-start mb-4">
        <button className="text-gray-600" onClick={onBackClick}>
          <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />
        </button>
      </div>

      <div className="p-2 w-[1000px] max-w-4xl mx-auto flex flex-col gap-6 bg-white rounded-md">
        <h2 className="text-2xl  font-medium text-gray-800 mt-4 ml-2 -mb-4">
          {warehouse?.name} - Reviews
        </h2>

        <div className="pt-0 p-8">
          {loading ? (
            <div className="flex justify-center items-center">
              <ClipLoader size={50} color={"#4FD1C5"} loading={loading} />
            </div>
          ) : currentReviews.length > 0 ? (
            currentReviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={{
                  id: review._id,
                  userImage: review.customerProfiles || "userde.jpg",
                  userName: review.customerName,
                  date: new Date(review.createdAt).toLocaleDateString(),

                  content: review.feedback,
                  rating: review.rating, // Pass rating to ReviewCard
                }}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No reviews found.</p>
          )}
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

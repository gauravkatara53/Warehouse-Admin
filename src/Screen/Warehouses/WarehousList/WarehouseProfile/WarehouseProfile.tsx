import { useState } from "react";
import ProfileAboveSec from "./ProfileAboveSec";
import RecentListings from "./RecentListing/WarehouseData";
import RecentReviews from "./RecentReviews/RecentReviews";

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
  partnerName: string;
  ratingCount: string;
  state: string;
  city: string;
  pincode: number;
  address: string;
  country: string;
  thumbnail: string;
}

interface WarehouseProfileProps {
  warehouse: Warehouse;
  onBackClick: () => void;
}

export default function WarehouseProfile({
  warehouse,
  onBackClick,
}: WarehouseProfileProps) {
  const [showReviews, setShowReviews] = useState(false);

  const handleViewReviewsClick = () => setShowReviews(true);
  const handleBackClick = () => setShowReviews(false);

  return (
    <div className="flex flex-wrap lg:flex-nowrap -mt-8">
      <div className="p-2 -mt-3 sm:p-4 lg:mt-0 sm:mt-6">
        {!showReviews ? (
          <>
            <ProfileAboveSec
              warehouse={warehouse}
              onBackClick={onBackClick}
              onSelectReviews={handleViewReviewsClick}
            />
            <RecentListings />
          </>
        ) : (
          <RecentReviews warehouse={warehouse} onBackClick={handleBackClick} />
        )}
      </div>
    </div>
  );
}

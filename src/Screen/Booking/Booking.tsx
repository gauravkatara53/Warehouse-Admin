import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faUser,
  faGlobe,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import CardWrapper1 from "@/Components/Common/WHWrapper1";
import Sidebar from "@/Components/Common/SideBar/Sidebar";
import AllBooking from "./BookingData/BookingList";
import BookingModal from "./BookingData/BookingModal"; // Ensure you import the BookingModal component

export default function Booking() {
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  const handleClosePopUp = () => {
    setSelectedBooking(null); // Close the modal by resetting the state
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-2 -mt-3 sm:p-4 lg:mt-0 sm:mt-6">
        {/* Top section with four CardWrapper1 components */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <CardWrapper1
            heading="Top Booking"
            mainNumber="150"
            className="sm:mb-0 -mb-3"
            icon={<FontAwesomeIcon icon={faWallet} />}
          />
          <CardWrapper1
            heading="Week's Booking"
            mainNumber="200"
            className="sm:mb-0 -mb-3"
            icon={<FontAwesomeIcon icon={faGlobe} />}
          />
          <CardWrapper1
            heading="Month's Booking"
            mainNumber="1200"
            className="sm:mb-0 -mb-3"
            icon={<FontAwesomeIcon icon={faUser} />}
          />
          <CardWrapper1
            heading="Year's Booking"
            mainNumber="150"
            className="sm:mb-0 -mb-3"
            icon={<FontAwesomeIcon icon={faStar} />}
          />
        </div>

        {/* Bottom section split into two parts: left and right */}
        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          {/* Left part */}
          <div className="flex flex-col w-full lg:w-[55%] space-y-6 flex-shrink-0">
            <div className=" min-h-[200px] rounded-lg">
              <AllBooking onBookingSelect={setSelectedBooking} />
            </div>
          </div>

          {/* Right part */}
          <div className="flex-grow ml-1 w-full lg:w-[45%] space-y-6">
            <div className="p-2  min-h-[200px] rounded-lg">
              {selectedBooking ? (
                <BookingModal
                  booking={selectedBooking}
                  onClose={handleClosePopUp}
                />
              ) : (
                <div className="text-center text-gray-500"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

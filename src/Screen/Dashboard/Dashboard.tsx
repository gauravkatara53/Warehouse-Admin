import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons"; // Wallet icon
import { faPaypal } from "@fortawesome/free-brands-svg-icons"; // PayPal icon
import CardWrapper1 from "@/Components/Common/WHWrapper1";
import CardWrapper2 from "@/Components/Common/WHWrapper2";
import Sidebar from "@/Components/Common/SideBar/Sidebar";
import PartnerInfoSection from "./PartnerInfoSection/PartnerInfo";
import TransactionSection from "./Transaction/TransactionSection";
import RecentBooking from "./Booking/RecentBooking";

export default function Dashboard() {
  return (
    <div className="flex flex-wrap lg:flex-nowrap">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-2 -mt-3 sm:p-4 lg:mt-0 sm:mt-6">
        {/* Top section with four CardWrapper1 components */}
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <CardWrapper1
            heading="Top Booking"
            mainNumber="150"
            sideNumber="+20%"
            className="sm:mb-0 -mb-3"
            icon={<FontAwesomeIcon icon={faWallet} />}
          />
          <CardWrapper1
            heading="Month's Booking"
            mainNumber="200"
            sideNumber="+35%"
            className="sm:mb-0 -mb-3"
            icon={<FontAwesomeIcon icon={faGlobe} />}
          />
          <CardWrapper1
            heading="No.of warehouses"
            mainNumber="1200"
            sideNumber="+50%"
            className="sm:mb-0 -mb-3"
            icon={<FontAwesomeIcon icon={faUser} />}
          />
          <CardWrapper1
            heading="Active warehouses"
            mainNumber="150"
            sideNumber="+20%"
            className="sm:mb-0 -mb-3"
            icon={<FontAwesomeIcon icon={faStar} />}
          />
        </div>

        {/* Bottom section split into two parts: left and right */}
        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          {/* Left part */}
          <div className=" flex flex-col w-full lg:w-[35%] space-y-6 flex-shrink-0">
            {/* CardWrapper2 components */}
            <div className="grid grid-cols-2 gap-4">
              <CardWrapper2
                heading="Today"
                subHeading="Earnings"
                bottomHeading="+Rs.2000"
                icon={<FontAwesomeIcon icon={faWallet} />} // Wallet icon
              />
              <CardWrapper2
                heading="This month"
                subHeading="Earnings"
                bottomHeading="Rs.4550"
                icon={<FontAwesomeIcon icon={faPaypal} />} // PayPal icon
              />
            </div>

            {/* PartnerInfoSection */}
            <div className="bg-gray-100  rounded-lg w-full">
              <PartnerInfoSection />
            </div>
          </div>

          {/* Right part */}
          <div className="flex-grow ml-1 w-full lg:w-2/3 space-y-6">
            <div className="p-2 bg-white min-h-[200px] rounded-lg">
              <TransactionSection />
            </div>
            <div className=" bg-white  min-h-[200px] rounded-lg">
              <RecentBooking></RecentBooking>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

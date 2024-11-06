import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons"; // Wallet icon
import Sidebar from "@/Components/Common/SideBar/Sidebar";
import { faStar, faUser, faGlobe } from "@fortawesome/free-solid-svg-icons";
import CardWrapper1 from "@/Components/Common/WHWrapper1";
import TransactionSectionAll from "./Transaction/TransactionSection";
import Coupons from "./Coupons/Coupons";
export default function Earning() {
  return (
    <div className="flex flex-wrap lg:flex-nowrap overflow-hidden ">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-2 -mt-3 sm:p-4 lg:mt-0 sm:mt-6">
        {/* Top section with four CardWrapper1 components */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <CardWrapper1
            heading="Total Earning"
            mainNumber="Rs.173,000"
            // sideNumber="+20%"
            className="sm:mb-0 -mb-3"
            icon={<FontAwesomeIcon icon={faWallet} />}
          />
          <CardWrapper1
            heading="Week's Earning"
            mainNumber="Rs.500,000"
            // sideNumber="+35%"
            className="sm:mb-0 -mb-3"
            icon={<FontAwesomeIcon icon={faGlobe} />}
          />
          <CardWrapper1
            heading="Month's Earning"
            mainNumber="Rs.173,000"
            // sideNumber="+50%"
            className="sm:mb-0 -mb-3"
            icon={<FontAwesomeIcon icon={faUser} />}
          />
          <CardWrapper1
            heading="Year's Earning"
            mainNumber="Rs.173,000"
            // sideNumber="+20%"
            className="sm:mb-0 -mb-3"
            icon={<FontAwesomeIcon icon={faStar} />}
          />
        </div>

        {/* Bottom section split into two parts: left and right */}
        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          {/* Left part */}
          <div className="flex flex-col w-full lg:w-[55%] space-y-6 flex-shrink-0">
            {/* CardWrapper2 components */}
            <div className=" min-h-[200px] rounded-lg">
              <TransactionSectionAll></TransactionSectionAll>
            </div>
          </div>

          {/* Right part */}
          <div className="flex-grow ml-1 w-full lg:w-[45%] space-y-6">
            <div className="p-2 bg-white min-h-[200px] rounded-lg">
              <Coupons></Coupons>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

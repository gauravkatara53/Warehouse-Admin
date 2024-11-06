import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons"; // Wallet icon
import CardWrapper1 from "@/Components/Common/WHWrapper1";
import Sidebar from "@/Components/Common/SideBar/Sidebar";
import ComplaintsList from "./ComplaintsList/ComplaintsList";
// import Coupons from "./Coupons/Coupons";

export default function Complaints() {
  return (
    <div className="flex flex-wrap lg:flex-nowrap overflow-hidden ">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-2 -mt-3 sm:p-4 lg:mt-0 sm:mt-6">
        {/* Top section with four CardWrapper1 components */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <CardWrapper1
            heading="No.of complaints"
            mainNumber="15"
            // sideNumber="+20%"
            className="sm:mb-0 -mb-3"
            icon={<FontAwesomeIcon icon={faWallet} />}
          />
          <CardWrapper1
            heading="Solved complaints"
            mainNumber="10"
            // sideNumber="+35%"
            className="sm:mb-0 -mb-3"
            icon={<FontAwesomeIcon icon={faGlobe} />}
          />
          <CardWrapper1
            heading="Pending complaints"
            mainNumber="12"
            // sideNumber="+50%"
            className="sm:mb-0 -mb-3"
            icon={<FontAwesomeIcon icon={faUser} />}
          />
          <CardWrapper1
            heading="Replied complaints"
            mainNumber="8"
            // sideNumber="+20%"
            className="sm:mb-0 -mb-3"
            icon={<FontAwesomeIcon icon={faStar} />}
          />
        </div>

        {/* Bottom section split into two parts: left and right */}
        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          {/* Left part */}
          <div className="flex flex-col w-full lg:w-[65%] space-y-6 flex-shrink-0">
            {/* CardWrapper2 components */}
            <div className=" min-h-[200px] rounded-lg">
              <ComplaintsList />
            </div>
          </div>

          {/* Right part */}
          <div className="flex-grow ml-1 w-full lg:w-[35%] space-y-6">
            {/* <div className="p-2 bg-white min-h-[200px] rounded-lg">
              <Coupons />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

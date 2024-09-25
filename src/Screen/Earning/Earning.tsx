import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons"; // Wallet icon
import { faPaypal } from "@fortawesome/free-brands-svg-icons"; // PayPal icon
import CardWrapper2 from "@/Components/Common/WHWrapper2";
import Sidebar from "@/Components/Common/SideBar/Sidebar";
import TransactionSectionAll from "./Transaction/TransactionSection";
import DBCard from "./DebitCard/DebitCard";
import AddCard from "./AddCard/AddCard";

export default function Earning() {
  return (
    <div className="flex flex-wrap lg:flex-nowrap">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-2 -mt-3 sm:p-4 lg:mt-0 sm:mt-6">
        {/* Top section with four CardWrapper1 components */}

        {/* Bottom section split into two parts: left and right */}
        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          {/* Left part */}
          <div className=" flex flex-col w-full lg:w-[35%] space-y-6 flex-shrink-0">
            {/* CardWrapper2 components */}

            <div className=" flex justify-center items-center">
              <DBCard></DBCard>
            </div>
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
            <div className="bg-white  rounded-lg w-full">
              <AddCard></AddCard>
            </div>
          </div>

          {/* Right part */}
          <div className="flex-grow ml-1 w-full lg:w-2/3 space-y-6">
            <div className="p-2 bg-white min-h-[200px] rounded-lg">
              <TransactionSectionAll></TransactionSectionAll>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Sidebar from "@/Components/Common/SideBar/Sidebar";
import PartnerInfoSection from "./PartnerInfoSection/PartnerInfo";
import TransactionSection from "./Transaction/TransactionSection";
import RecentBooking from "./Booking/RecentBooking";
import DashBoardUpperCard from "./Cards/DashboardUpperCard";

import Card2 from "./Cards/card2";

export default function Dashboard() {
  return (
    <div className="flex flex-wrap lg:flex-nowrap">
      <Sidebar />

      <div className="flex-1 p-2 sm:p-4">
        <DashBoardUpperCard />

        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          {/* Left Section */}
          <div className="flex flex-col w-full lg:w-[35%] space-y-6">
            <Card2></Card2>
            <div className="bg-gray-100 rounded-lg w-full">
              <PartnerInfoSection />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-grow w-full lg:w-2/3 space-y-6">
            <div className="p-2 bg-white min-h-[200px] rounded-lg">
              <TransactionSection />
            </div>
            <div className="bg-white min-h-[200px] rounded-lg">
              <RecentBooking />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

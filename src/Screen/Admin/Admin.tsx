import Sidebar from "@/Components/Common/SideBar/Sidebar";
import Applicants from "./Applicants/Applicants";
import AdminCard from "./AdminCard";

export default function Admin() {
  return (
    <div className="flex flex-wrap lg:flex-nowrap overflow-hidden ">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-2 -mt-3 sm:p-4 lg:mt-0 sm:mt-6">
        {/* Top section with four CardWrapper1 components */}
        <AdminCard />

        {/* Bottom section split into two parts: left and right */}
        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          {/* Left part */}
          <div className="flex flex-col w-full lg:w-[65%] space-y-6 flex-shrink-0">
            {/* CardWrapper2 components */}
            <div className=" min-h-[200px] rounded-lg">
              <Applicants></Applicants>
            </div>
          </div>

          {/* Right part */}
          <div className="flex-grow ml-1 w-full lg:w-[35%] space-y-6">
            {/* <div className="p-2 bg-white min-h-[200px] rounded-lg"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

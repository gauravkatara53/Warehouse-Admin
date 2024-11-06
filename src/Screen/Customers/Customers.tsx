import Sidebar from "@/Components/Common/SideBar/Sidebar";
import ToggleSwitch from "../../Components/Customers/ToggleSwitch";
import UserIndex from "./User/UserIndex";
import { useState } from "react";
import PartnerIndex from "./Partner/PartnerIndex";
import PartnerProfile from "./Partner/PartnerData/PartnerProfile/PartnerProfile";
import UserProfile from "./User/UserData/UserProfile/UserProfile";

interface Partner {
  _id: string;
  name: string;
  address: string;
  email: string; // Changed from String to string
  phone: string;
  membershipStatus: string;
  kycStatus: string;
  date: string;
  createdAt: string;
  gender: string; // Changed from String to string
  lastActive: string; // Changed from String to string
  dob: string; // Changed from String to string
}

interface User {
  _id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  profileStatus: string;
  date: string;
  gender: string;
  lastActive: string;
  dob: string;
  createdAt: string;
}

export default function Customers() {
  const [isUserActive, setIsUserActive] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const toggleUserActive = () => {
    setIsUserActive((prev) => !prev);
    setSelectedPartner(null); // Reset selected partner when toggling tabs
    setSelectedUser(null); // Reset selected user when toggling tabs
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap ">
      <Sidebar />

      <div className="flex-1 p-2 -mt-3 sm:p-4 lg:mt-0 sm:mt-6">
        {/* Conditionally render ToggleSwitch based on selection */}
        {!selectedPartner && !selectedUser && (
          <ToggleSwitch
            isUserActive={isUserActive}
            toggleUserActive={toggleUserActive}
          />
        )}

        <div>
          {isUserActive ? (
            selectedUser ? (
              <UserProfile
                user={selectedUser}
                onBackClick={() => setSelectedUser(null)}
              />
            ) : (
              <UserIndex onSelectUser={setSelectedUser} />
            )
          ) : selectedPartner ? (
            <PartnerProfile
              partner={selectedPartner}
              onBackClick={() => setSelectedPartner(null)}
            />
          ) : (
            <PartnerIndex onSelectPartner={setSelectedPartner} />
          )}
        </div>
      </div>
    </div>
  );
}

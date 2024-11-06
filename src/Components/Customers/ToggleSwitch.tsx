import React from "react";

interface ToggleSwitchProps {
  isUserActive: boolean;
  toggleUserActive: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isUserActive,
  toggleUserActive,
}) => {
  return (
    <div className="my-4">
      <div
        className="relative border flex items-center justify-between w-64 h-12 rounded-full bg-white cursor-pointer"
        onClick={toggleUserActive}
      >
        {/* Partner Tab */}
        <div
          className={`flex items-center justify-center w-1/2 h-full rounded-full transition-all duration-500 ease-in-out 
                      ${isUserActive ? "text-black" : "text-white"} z-10`}
        >
          Partner
        </div>
        {/* User Tab */}
        <div
          className={`flex items-center justify-center w-1/2 h-full rounded-full transition-all duration-500 ease-in-out 
                      ${isUserActive ? "text-white" : "text-black"} z-10`}
        >
          User
        </div>
        {/* Sliding Background */}
        <div
          className={`absolute w-1/2 h-full bg-[#7760E8F2] rounded-full transition-transform duration-500 ease-in-out 
                      ${
                        isUserActive ? "translate-x-full" : "translate-x-0"
                      } z-0`}
        />
      </div>
    </div>
  );
};

export default ToggleSwitch;

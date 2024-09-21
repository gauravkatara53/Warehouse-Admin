import React from "react";

// Define the types for the props
interface CardProps {
  heading: string;
  mainNumber: string;
  sideNumber: string;
  icon: React.ReactNode;
  className?: string; // Optional class for the entire card
}

const CardWrapper1: React.FC<CardProps> = ({
  heading,
  mainNumber,
  sideNumber,
  icon,
  className = "", // Default to an empty string if no className is provided
}) => {
  return (
    <div
      className={`bg-white p-4 rounded-md shadow-md flex items-center ${className}`}
    >
      {/* Left Section */}
      <div className="flex-1">
        <h2 className="text-sm text-gray-400 font-medium ">{heading}</h2>
        <div className="flex items-baseline">
          <p className="text-md font-semibold">{mainNumber}</p>
          <span className="text-md  font-semibold text-green-500 ml-8">
            {sideNumber}
          </span>
        </div>
      </div>
      {/* Right Section */}
      <div
        className="flex items-center justify-center w-12 h-12 rounded-lg"
        style={{ backgroundColor: "#6F55EFA6" }}
      >
        {icon && <div className="text-white">{icon}</div>}
      </div>
    </div>
  );
};

export default CardWrapper1;

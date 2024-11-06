import React from "react";

// Define the types for the props
interface CardProps {
  heading?: string; // Optional heading
  mainNumber?: React.ReactNode; // Change mainNumber to React.ReactNode to accept elements
  sideNumber?: string; // Optional side number to display
  icon?: React.ReactNode; // Optional icon element
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
        {/* Render heading only if it exists */}
        {heading && (
          <h2 className="text-sm text-gray-400 font-medium">{heading}</h2>
        )}
        <div className="flex items-baseline">
          {/* Render mainNumber only if it exists */}
          {mainNumber && <p className="text-md font-semibold">{mainNumber}</p>}
          {/* Render sideNumber only if it exists */}
          {sideNumber && (
            <span className="text-md font-semibold text-green-500 ml-8">
              {sideNumber}
            </span>
          )}
        </div>
      </div>
      {/* Right Section */}
      <div
        className="flex items-center justify-center w-12 h-12 rounded-lg"
        style={{ backgroundColor: "#6F55EFA6" }}
      >
        {/* Render icon only if it exists */}
        {icon && <div className="text-white">{icon}</div>}
      </div>
    </div>
  );
};

export default CardWrapper1;

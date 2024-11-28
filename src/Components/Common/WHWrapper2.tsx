import React from "react";

// Define the types for the props
interface CardProps {
  heading: string;
  subHeading: string;
  bottomHeading: React.ReactNode; // Updated to React.ReactNode
  icon: React.ReactNode;
  className?: string;
}

const CardWrapper2: React.FC<CardProps> = ({
  heading,
  subHeading,
  bottomHeading,
  icon,
  className = "",
}) => {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md flex flex-col items-center ${className}`}
      style={{ maxWidth: "250px" }}
    >
      {/* Icon Section */}
      <div
        className="flex items-center justify-center w-16 h-16 rounded-lg mb-4"
        style={{ backgroundColor: "#4FD1C5" }}
      >
        {icon && <div className="text-white text-3xl">{icon}</div>}
      </div>
      {/* Heading Section */}
      <h2 className="text-md text-gray-700 font-medium mb-1">{heading}</h2>
      {/* Subheading Section */}
      <p className="text-base text-gray-400 mb-4">{subHeading}</p>
      {/* Border Section */}
      <div className="border-t w-28 border-gray-300 mb-2" />
      {/* Bottom Heading Section */}
      <h3 className="text-md font-semibold">{bottomHeading}</h3>
    </div>
  );
};

export default CardWrapper2;

import React from "react";

// Define the types for the props
interface CardProps {
  heading: string;
  subHeading: string;
  bottomHeading: string;
  icon: React.ReactNode;
  className?: string; // Optional class for the entire card
}

const CardWrapper2: React.FC<CardProps> = ({
  heading,
  subHeading,
  bottomHeading,
  icon,
  className = "", // Default to an empty string if no className is provided
}) => {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md flex flex-col items-center ${className}`}
      style={{ maxWidth: "250px" }} // Increase max width for larger size
    >
      {/* Icon Section */}
      <div
        className="flex items-center justify-center w-16 h-16 rounded-lg mb-4"
        style={{ backgroundColor: "#4FD1C5" }}
      >
        {icon && <div className="text-white text-3xl">{icon}</div>}{" "}
        {/* Larger icon size */}
      </div>
      {/* Heading Section */}
      <h2 className="text-md text-gray-700 font-medium mb-1">{heading}</h2>{" "}
      {/* Larger heading */}
      {/* Subheading Section */}
      <p className="text-base text-gray-400 mb-4">{subHeading}</p>{" "}
      {/* Larger subheading */}
      {/* Border Section */}
      <div className="border-t w-28  border-gray-300 mb-2" />{" "}
      {/* Slightly wider border */}
      {/* Bottom Heading Section */}
      <h3 className="text-md font-semibold">{bottomHeading}</h3>{" "}
      {/* Larger bottom heading */}
    </div>
  );
};

export default CardWrapper2;

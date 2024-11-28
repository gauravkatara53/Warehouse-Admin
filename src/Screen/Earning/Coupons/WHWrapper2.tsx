import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

// Define the types for the props
interface CardProps {
  heading: string;
  subHeading: string;
  bottomHeading: string;
  icon: React.ReactNode;
  className?: string; // Optional class for the entire card
  onUpdate: () => void; // Function to handle update
  onDelete: () => void; // Function to handle delete
}

const CardWrapper2: React.FC<CardProps> = ({
  heading,
  subHeading,
  bottomHeading,
  icon,
  className = "", // Default to an empty string if no className is provided
  onUpdate,
  onDelete,
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false); // State for showing options
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref to detect outside click

  const handleDotsClick = () => {
    setShowOptions((prev) => !prev); // Toggle options visibility
  };

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if dropdown is open and the click is outside the dropdown or the dots button
      if (
        showOptions &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".dots-icon")
      ) {
        setShowOptions(false); // Close dropdown if click outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]); // Add showOptions as a dependency

  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md flex flex-col items-center relative ${className}`}
      style={{ maxWidth: "250px" }} // Increase max width for larger size
    >
      {/* Ellipsis Icon Section */}
      <div
        className="absolute top-4 right-4 cursor-pointer dots-icon " // Positioning for the dots icon
        onClick={handleDotsClick} // Handle click event
      >
        <FontAwesomeIcon icon={faEllipsisV} className="text-gray-600" />
      </div>

      {/* Options Dropdown */}
      {showOptions && (
        <div
          ref={dropdownRef} // Add ref to dropdown to detect clicks outside
          className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10"
        >
          <button
            className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
            onClick={() => {
              onUpdate();
              setShowOptions(false); // Close dropdown after action
            }}
          >
            Active/Inactive
          </button>
          <button
            className="block px-4 w-full py-2 text-left text-gray-700 hover:bg-gray-200"
            onClick={() => {
              onDelete();
              setShowOptions(false); // Close dropdown after action
            }}
          >
            Delete
          </button>
        </div>
      )}

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
      <p className="text-base text-gray-400 mb-1 whitespace-nowrap">
        {subHeading}
      </p>
      {/* Border Section */}
      <div className="border-t w-28 border-gray-300 mb-2" />
      {/* Bottom Heading Section */}
      <h3 className="text-md font-semibold">{bottomHeading}</h3>
    </div>
  );
};

export default CardWrapper2;

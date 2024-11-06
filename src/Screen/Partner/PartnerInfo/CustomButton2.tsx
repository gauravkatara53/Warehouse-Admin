// CustomButton2.tsx
import React from "react";

interface CustomButtonProps {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
  selected?: boolean; // Optional prop to handle selected state
}

const CustomButton2: React.FC<CustomButtonProps> = ({
  className = "",
  onClick,
  children,
  selected = false, // Default to false if no selected prop is provided
}) => {
  return (
    <button
      className={`py-2 px-2  text-sm rounded-md ${
        selected ? "bg-purple-700 text-white" : "bg-[#9F8EF2] text-gray-600"
      } ${className} transition-colors duration-200 ease-in-out`} // Updated text color logic
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton2;

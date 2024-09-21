import React from "react";

// Define the types for the props
interface ButtonProps {
  children: React.ReactNode; // The button text or content
  onClick?: () => void; // Optional click handler
  className?: string; // Optional class for custom styles
}

const CustomButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "", // Default to an empty string if no className is provided
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#9F8EF2] text-white py-2 px-4 mx-2 rounded-md ${className}`} // Base styles + custom className
    >
      {children}
    </button>
  );
};

export default CustomButton;

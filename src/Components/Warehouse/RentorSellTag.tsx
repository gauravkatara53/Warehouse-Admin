import React from "react";

interface RentOrSellTagProps {
  type: "Rent" | "Sell";
}

const RentOrSellTag: React.FC<RentOrSellTagProps> = ({ type }) => {
  const tagStyle = type === "Rent" ? "bg-green-500" : "bg-blue-500";

  return (
    <span
      className={`inline-block px-1 py-0.5 ml-1 p-2 text-white rounded-full text-xs ${tagStyle}`} // Adjusted padding and font size
    >
      {type}
    </span>
  );
};

export default RentOrSellTag;

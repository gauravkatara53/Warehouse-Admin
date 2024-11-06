import React from "react";

interface StatusTagProps {
  status:
    | "completed"
    | "Verified"
    | "processing"
    | "rejected"
    | "Not completed"
    | "Not Found";
  className?: string;
}

const StatusTag: React.FC<StatusTagProps> = ({ status, className }) => {
  let bgColor: string;
  let textColor: string;

  switch (status) {
    case "completed":
    case "Verified":
      bgColor = "#d8f2d8";
      textColor = "#00B69B";
      break;
    case "processing":
      bgColor = "#cab8f5";
      textColor = "#6226EF";
      break;
    case "rejected":
      bgColor = "#FFCFCF";
      textColor = "#EF3826";
      break;
    case "Not completed":
    case "Not Found":
      bgColor = "#FFFFFF";
      textColor = "#EF3826";
      break;
    default:
      bgColor = "#FFFFFF";
      textColor = "#EF3826";
      break;
  }

  const styles = {
    backgroundColor: bgColor,
    color: textColor,
    padding: "5px 10px",
    borderRadius: "5px",
    display: "inline-block",
    fontWeight: "semi-bold" as const,
  };

  // Safely handle undefined status
  const displayStatus = status
    ? status.charAt(0).toUpperCase() + status.slice(1)
    : "Unknown";

  return (
    <span style={styles} className={className}>
      {displayStatus}
    </span>
  );
};

export default StatusTag;

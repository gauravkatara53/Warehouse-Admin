import React, { useEffect, useState } from "react";

const ScreenWarning: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(
    window.innerWidth <= 768
  );

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isSmallScreen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-red-100 border border-red-300 text-red-700 rounded-lg shadow-lg z-50 text-center">
          This application is best viewed on a desktop. Please switch to a
          larger screen for a better experience.
        </div>
      )}
    </>
  );
};

export default ScreenWarning;

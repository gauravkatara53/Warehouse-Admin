// SignUp.js
import { useState, useEffect } from "react";
import SignUpMobile from "./SignUpMobile"; // Import your mobile sign-up component
import SignUpDesktop from "./SignUpDesktop"; // Import your desktop sign-up component

const SignUp = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Adjust the width according to your needs

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <>{isMobile ? <SignUpMobile /> : <SignUpDesktop />}</>;
};

export default SignUp;

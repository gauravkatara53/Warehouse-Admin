import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import PrivateRoute from "@/Components/PrivateRoute";
import SignIn from "./Screen/Auth/SignIn/SignIn";
import Dashboard from "./Screen/Dashboard/Dashboard";
import Earning from "./Screen/Earning/Earning";
import Booking from "./Screen/Booking/Booking";
import Warehouses from "./Screen/Warehouses/Warehouses";
import Complaints from "./Screen/Complaints/Complaints";
import Profile from "./Screen/Profile/Profile";
import SignUp from "./Screen/Auth/SignUp/SignUp";
import Admin from "./Screen/Admin/Admin";
import NotFoundPage from "./Components/Common/NotFoundPage/NotFoundPage";
import ExampleComponent from "./Components/APIService/ExampleComponent";
import Customers from "./Screen/Customers/Customers";
import Partner from "./Screen/Partner/Partner";
import NotDataFound from "./Components/Common/NotFoundPage/NoDataFound";
import DesktopMessage from "./Components/Common/DesktopMessage";

function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route
            path="/signin"
            element={isSmallScreen ? <DesktopMessage /> : <SignIn />}
          />
          <Route
            path="/signup"
            element={isSmallScreen ? <DesktopMessage /> : <SignUp />}
          />
          <Route
            path="/"
            element={
              <PrivateRoute
                element={isSmallScreen ? <DesktopMessage /> : <Dashboard />}
              />
            }
          />
          <Route
            path="/earning"
            element={
              <PrivateRoute
                element={isSmallScreen ? <DesktopMessage /> : <Earning />}
              />
            }
          />
          <Route
            path="/booking"
            element={
              <PrivateRoute
                element={isSmallScreen ? <DesktopMessage /> : <Booking />}
              />
            }
          />
          <Route
            path="/warehouses"
            element={
              <PrivateRoute
                element={isSmallScreen ? <DesktopMessage /> : <Warehouses />}
              />
            }
          />
          <Route
            path="/partners"
            element={
              <PrivateRoute
                element={isSmallScreen ? <DesktopMessage /> : <Partner />}
              />
            }
          />
          <Route
            path="/complaints"
            element={
              <PrivateRoute
                element={isSmallScreen ? <DesktopMessage /> : <Complaints />}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute
                element={isSmallScreen ? <DesktopMessage /> : <Profile />}
              />
            }
          />
          <Route
            path="/approve-admins"
            element={
              <PrivateRoute
                element={isSmallScreen ? <DesktopMessage /> : <Admin />}
              />
            }
          />
          <Route
            path="/customers"
            element={
              <PrivateRoute
                element={isSmallScreen ? <DesktopMessage /> : <Customers />}
              />
            }
          />
          <Route
            path="/a"
            element={
              <PrivateRoute
                element={
                  isSmallScreen ? <DesktopMessage /> : <ExampleComponent />
                }
              />
            }
          />
          <Route
            path="*"
            element={
              <PrivateRoute
                element={isSmallScreen ? <DesktopMessage /> : <NotFoundPage />}
              />
            }
          />
          <Route
            path="/nodata"
            element={
              <PrivateRoute
                element={isSmallScreen ? <DesktopMessage /> : <NotDataFound />}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

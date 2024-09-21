import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignInPage from "./Screen/Auth/SignIn/SignIn";
import Sidebar from "./Components/Common/SideBar/Sidebar";
import Dashboard from "./Screen/Dashboard/Dashboard";
import Earning from "./Screen/Earning/Earning";
import Booking from "./Screen/Booking/Booking";
import Warehouses from "./Screen/Warehouses/Warehouses";
import Complaints from "./Screen/Complaints/Complaints";
import Profile from "./Screen/Profile/Profile";
// Import other components as needed, e.g., NotFoundPage

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/earning" element={<Earning />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/warehouses" element={<Warehouses />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/profile" element={<Profile />} />

          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignIn from "./Screen/Auth/SignIn/SignIn";
import Dashboard from "./Screen/Dashboard/Dashboard";
import Earning from "./Screen/Earning/Earning";
import Booking from "./Screen/Booking/Booking";
import Warehouses from "./Screen/Warehouses/Warehouses";
import Complaints from "./Screen/Complaints/Complaints";
import Profile from "./Screen/Profile/Profile";
import SingUp from "./Screen/Auth/SignUp/SignUp";
import Admin from "./Screen/Admin/Admin";
import NotFoundPage from "./Components/Common/NotFoundPage/NotFoundPage";
import ExampleComponent from "./Components/APIService/ExampleComponent";
import Customers from "./Screen/Customers/Customers";
import Partner from "./Screen/Partner/Partner";
import NotDataFound from "./Components/Common/NotFoundPage/NoDataFound";

// Import other components as needed, e.g., NotFoundPage

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SingUp />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/earning" element={<Earning />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/warehouses" element={<Warehouses />} />
          <Route path="/partners" element={<Partner />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/approve-admins" element={<Admin />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/a" element={<ExampleComponent />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="nodata" element={<NotDataFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

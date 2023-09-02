import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignupPage from "./pages/Authentication/Signup";
import LoginPage from "./pages/Authentication/Login";
import HomePage from "./pages/User/HomePage";
import ProfilePage from "./pages/User/ProfilePage";
import AdminHome from "./pages/Admin/Home";
import ManageUser from "./pages/Admin/User";
import ManageVehicle from "./pages/Admin/Vehicle";
import ManageCoupon from "./pages/Admin/Coupon";
import AdminLogin from "./pages/Admin/AdminLogin";

function App() {
  localStorage.setItem("userToken","jdjjas")
  const userAuth = Boolean(localStorage.getItem("userToken"));

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" exact element={<HomePage />} />

        <Route path="/profile" element={<ProfilePage />} />

        {/* admin Route  */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/home/" element={<AdminHome />} />
        <Route path="/admin/users" element={<ManageUser />} />
        <Route path="/admin/Vehicles" element={<ManageVehicle />} />
        <Route path="/admin/coupon" element={<ManageCoupon />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
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
import AdminProtectedRoutes from "./utils/AdminRoute";
import UserProtectedRoutes from "./utils/UserRoute";
import RefreshSetup from "./utils/RefreshSetup";
import Cars from "./pages/User/Cars";
import AddCars from "./components/admin/AddCars";
import { UsersProvider } from "./components/context/UsersContext";
import { CarsProvider } from "./components/context/CarsContext";
import CarDet from "./pages/User/CarDet";
import ChatSection from "./components/user/Chat";
import Checkout from "./pages/User/Checkout";
import AdminChatBox from "./pages/Admin/Chat"
import Bookings from './pages/Admin/Bookings'
import ReviewForm from "./components/user/ReviewPost";
import AddCoupons from "./components/admin/AddCoupon";
import BookingList from "./pages/User/BookingList";
function App() {

 
  return (
    <div >
   
   <Router>
      <Routes>
          
          <Route path="/login" element={<RefreshSetup><LoginPage/></RefreshSetup>}> </Route>
          <Route path="/signup" element={<RefreshSetup><SignupPage/></RefreshSetup>}> </Route>
          <Route path="/" element={<HomePage/>}> </Route>

          <Route path='/cars' element={
            <CarsProvider>
              <Cars/>
            </CarsProvider>
          }/>

          <Route path='/cars/:carId' element={
          <CarsProvider>
            <CarDet/>
          </CarsProvider>
        }/>

          <Route path='/cars/:carId/checkout' element={
          <CarsProvider>
            <Checkout/>
          </CarsProvider>
        }/>

        <Route path="/chat" element={
          <ChatSection/>
        }/>
          
          <Route path="/profile" element={
            <UserProtectedRoutes>
            <UsersProvider>
              <ProfilePage/>
            </UsersProvider>
            </UserProtectedRoutes>
          } />
          <Route path="/profile/bookings" element={
            <UserProtectedRoutes>
            <UsersProvider>
              <BookingList/>
            </UsersProvider>
            </UserProtectedRoutes>
          } />
          <Route path="/review/:bookingId" element={
            <UserProtectedRoutes>
            <UsersProvider>
              <ReviewForm/>
            </UsersProvider>
            </UserProtectedRoutes>
          } />

        {/* admin Route  */}

        <Route path="/admin" element={<AdminLogin />} />
          
        <Route path="/admin/home" element={
              <AdminProtectedRoutes>
                <CarsProvider>
                <UsersProvider>
                  <AdminHome />
                </UsersProvider>
                </CarsProvider>
              </AdminProtectedRoutes>
            }
            />
        <Route path="/admin/user" element={
              <AdminProtectedRoutes>
                <UsersProvider>
                  <ManageUser />
                </UsersProvider>
              </AdminProtectedRoutes> 
            }
            />
        <Route path="/admin/listcar" element={
              <AdminProtectedRoutes>
                <CarsProvider>
                  <ManageVehicle />
                </CarsProvider>
              </AdminProtectedRoutes>
            }
            />
        <Route path="/admin/coupon" element={
              <AdminProtectedRoutes>
                <ManageCoupon />
              </AdminProtectedRoutes>
            }/>
            <Route path='/admin/addcars' element={
              <AdminProtectedRoutes>
                <AddCars/>
              </AdminProtectedRoutes>
            }/>
            <Route path='/admin/addcoupons' element={
              <AdminProtectedRoutes>
                <AddCoupons/>
              </AdminProtectedRoutes>
            }/>
            <Route path='/admin/bookings' element={
              <AdminProtectedRoutes>
                <Bookings/>
              </AdminProtectedRoutes>
            }/>
            <Route path='/admin/chat' element={
              <AdminProtectedRoutes>
                <AdminChatBox/>
              </AdminProtectedRoutes>
            }/>
            <Route path='/admin/chat/chatbox/:adminid' element={
              <AdminProtectedRoutes>
                <AdminChatBox/>
              </AdminProtectedRoutes>
            }/>

            
      </Routes>
    </Router>
    </div>
  );
}

export default App;

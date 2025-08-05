import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import VerifyOTP from "@/pages/auth/VerifyOTP";
import ForgotPassWord from "@/pages/auth/ForgotPassWord";
import ForgotPasswordOTP from "./pages/auth/ForgotPasswordOTP";
import ResetPassword from "./pages/auth/ResetPassword";
import Home from "@/pages/Home";
import Messenger from "@/pages/Messenger";
import Profile from "@/pages/Profile";
import Explore from "@/pages/Explore";
import PrivateRoute from "@/routes/PrivateRoute";
import MainLayout from "@/layouts/MainLayout";
import AppSidebar from "@/components/AppSidebar";
import EditProfile from "@/pages/EditProfile";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect / to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassWord />} />
        <Route path="/forgot-password-otp" element={<ForgotPasswordOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Group all private routes under PrivateRoute */}
        <Route element={<PrivateRoute />}>
          {/* Home, Messenger, Explore dùng layout mặc định, Profile dùng fullWidth */}
          <Route element={<MainLayout sidebar={<AppSidebar />} maxWidth />}>
            <Route path="/home" element={<Home />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Route>
          <Route element={<MainLayout sidebar={<AppSidebar />} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/messenger" element={<Messenger />} />
            <Route path="/explore" element={<Explore />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

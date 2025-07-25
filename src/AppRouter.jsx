import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import VerifyOTP from "@/pages/auth/VerifyOTP";
import ForgotPassWord from "@/pages/auth/ForgotPassWord";
import ForgotPasswordOTP from "./pages/auth/ForgotPasswordOTP";
import ResetPassword from "./pages/auth/ResetPassword";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import PrivateRoute from "@/routes/PrivateRoute";

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
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          {/* ...thêm các route khác */}
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyForgotOTP } from "@/features/auth/forgotPassWordAPI";

function ForgotPasswordOTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);
  const initialMessage = location.state?.message || "";
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(initialMessage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp.trim()) {
      setError("Vui lòng nhập mã OTP");
      return;
    }

    try {
      await verifyForgotOTP(email, otp);
      // Nếu xác thực thành công, chuyển hướng sang trang đặt lại mật khẩu
      navigate("/reset-password", { state: { email, message: "Xác thực OTP thành công. Bạn có thể đặt lại mật khẩu mới." } });
    } catch (err) {
      setError(err?.message || "Xác thực OTP thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgr-gradient">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-brand-blue">Nhập mã OTP</h2>
        <p className="text-sm text-gray-500 text-center mb-2">
          Mã OTP đã được gửi tới email: <strong>{email || "(email của bạn)"}</strong>
        </p>
        <input
          type="text"
          name="otp"
          placeholder="Nhập mã OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm mt-1">{success}</p>
        )}
        <button
          type="submit"
          className="w-full bg-brand-green hover:bg-blue-700 text-white py-2 rounded-md"
        >
          Xác nhận OTP
        </button>
      </form>
    </div>
  );
}

export default ForgotPasswordOTP;

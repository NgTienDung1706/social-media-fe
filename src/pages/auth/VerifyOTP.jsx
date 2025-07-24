import { useState } from "react";
import { verifyOTP } from "@/features/auth/registerAPI";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function VerifyOTP() {
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp.trim()) {
      setError("Vui lòng nhập mã OTP");
      return;
    }

    try {
      await verifyOTP(email, otp);
      // Nếu xác thực thành công, chuyển hướng về trang đăng nhập
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Xác thực OTP thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgr-gradient">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Xác nhận OTP</h2>
        <p className="text-sm text-gray-500 text-center">
          Mã OTP đã được gửi đến email: <strong>{email}</strong>
        </p>

        <input
          type="text"
          name="otp"
          placeholder="Nhập mã OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
        >
          Xác nhận
        </button>
      </form>
    </div>
  );
}

export default VerifyOTP;

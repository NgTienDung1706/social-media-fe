
import { useState } from "react";
import { forgotPassword } from "@/features/auth/forgotPassWordAPI";
import { useNavigate } from "react-router-dom";

function ForgotPassWord() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Vui lòng nhập email");
      return;
    }

    try {
      await forgotPassword(email);
      // Chuyển hướng sang trang nhập OTP và truyền email + thông báo
      navigate("/forgot-password-otp", {
        state: {
          email,
          message: "Nếu email tồn tại, mã xác thực sẽ được gửi tới email của bạn."
        }
      });
    } catch (err) {
      setError(err?.message || "Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgr-gradient">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-brand-blue">Quên mật khẩu</h2>

        <input
          type="email"
          name="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-brand-green hover:bg-blue-700 text-white py-2 rounded-md"
        >
          Gửi mã xác thực
        </button>
      </form>
    </div>
  );
}

export default ForgotPassWord;

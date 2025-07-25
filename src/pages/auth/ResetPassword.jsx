import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "@/features/auth/forgotPassWordAPI";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);
  const initialMessage = location.state?.message || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(initialMessage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ mật khẩu mới và xác nhận mật khẩu.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      await resetPassword(email, password);
      navigate("/login", { state: { message: "Đổi mật khẩu thành công! Bạn có thể đăng nhập với mật khẩu mới." } });
    } catch (err) {
      setError(err?.message || "Đổi mật khẩu thất bại.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgr-gradient">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-brand-blue">Đặt lại mật khẩu mới</h2>
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu mới"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Xác nhận mật khẩu mới"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          Đổi mật khẩu
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;

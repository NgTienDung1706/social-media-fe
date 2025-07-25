import { useState , useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "@/features/auth/authAPI";

import logo3 from "@/assets/logo_cham2.png";

function Login() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      const res = await login({ email, password });

      // Lưu token vào localStorage
      localStorage.setItem("access_token", res.token);

      // (Tuỳ chọn) Lưu thông tin user vào localStorage
      //localStorage.setItem("user", JSON.stringify(res.user));

      // Chuyển hướng sang trang chủ
      navigate("/home");

    } catch (err) {
      console.error("Lỗi khi đăng nhập:", err);
      setError(err?.message || "Đăng nhập thất bại");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/home");
    }
  }, []);

  return (
  <div className="min-h-screen flex bg-bgr-gradient">
    {/* Logo bên trái - chiếm 1/3 */}
    <div className="w-1/3 flex items-center justify-start pl-32">
      <img src={logo3} alt="CHẠM" className="w-96 h-auto" />
    </div>

    {/* Form đăng nhập - chiếm 2/3 */}
    <div className="w-2/3 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Đăng Nhập</h2>
        {location.state?.message && (
          <div className="text-green-500 text-sm text-center mb-2">{location.state.message}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Mật khẩu</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition duration-200"
          >
            Đăng Nhập
          </button>
        </form>
        <div className="mt-6 text-center text-gray-500 text-sm">
          Bạn chưa có tài khoản?{" "}
          <button
            type="button"
            className="text-green-600 font-semibold hover:underline bg-transparent border-none outline-none cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Đăng ký
          </button>
        </div>
        <div className="mt-2 text-center text-gray-500 text-sm">
          <button
            type="button"
            className="text-blue-600 font-semibold hover:underline bg-transparent border-none outline-none cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Quên mật khẩu?
          </button>
        </div>
      </div>
    </div>
  </div>
);

}

export default Login;

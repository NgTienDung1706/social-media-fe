import { useState } from "react";
import { register } from "@/features/auth/registerAPI";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setApiError("");

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      // Xóa confirmPassword khỏi dữ liệu gửi đi
      const { confirmPassword, ...dataToSend } = formData;
      const res = await register(dataToSend);
      // Nếu thành công, chuyển hướng sang trang xác thực OTP
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (error) {
      // Xử lý lỗi từ API
      setApiError(error?.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgr-gradient">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-brand-blue">Đăng ký</h2>

        <input
          type="text"
          name="username"
          placeholder="Tên người dùng"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <div className="flex gap-4">
          <input
            type="text"
            name="lastName"
            placeholder="Họ"
            value={formData.lastName}
            onChange={handleChange}
            className="w-1/2 px-4 py-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="firstName"
            placeholder="Tên"
            value={formData.firstName}
            onChange={handleChange}
            className="w-1/2 px-4 py-2 border rounded-md"
            required
          />
        </div>
        {/* Ngày sinh */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Ngày sinh</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        {/* Giới tính */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Giới tính</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                required
              />
              Nam
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              Nữ
            </label>
          </div>
        </div>


        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Mật khẩu mới"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Xác nhận mật khẩu"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />

        {passwordError && (
          <p className="text-red-500 text-sm mt-1">{passwordError}</p>
        )}
        {apiError && (
          <p className="text-red-500 text-sm mt-1">{apiError}</p>
        )}


        <button
          type="submit"
          className="w-full bg-brand-green hover:bg-blue-700 text-white py-2 rounded-md"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
}

export default Register;

import { useEffect, useState } from "react";
import axios from "@/utils/axiosInstance"; // axios đã config interceptor

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/profile");
        setProfile(res.user);
      } catch (err) {
        console.error("Lỗi khi lấy profile:", err);
        setError(err?.message || "Đã xảy ra lỗi");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!profile) {
    return <div className="text-center mt-4">Đang tải thông tin...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-600">
        Thông tin cá nhân
      </h2>
      <div className="flex flex-col items-center gap-4">
        <img
          src={profile.avatar || "/default-avatar.png"}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="text-lg font-semibold">{profile.name}</div>
        <div className="text-gray-600">{profile.email}</div>
        <div className="text-gray-600">Username: {profile.username}</div>
      </div>
    </div>
  );
}

export default Profile;

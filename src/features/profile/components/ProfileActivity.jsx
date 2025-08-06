import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfileById, getProfile } from "@/features/profile/profileAPI"; 
import Profile from "@/pages/Profile";

function ProfileActivity() {
  const { username } = useParams(); // Lấy userId từ URL
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1️⃣ Lấy thông tin user đang đăng nhập
        const currentUser = await getProfile();
        setCurrentUserId(currentUser.user.username);

        // 2️⃣ Lấy thông tin profile của user cần xem
        const res = await getUserProfileById(username);
        setProfileData(res.user);

      } catch (err) {
        setError(err?.message || "Không thể tải thông tin người dùng");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);

  if (loading) return <div className="text-center mt-6">Đang tải...</div>;
  if (error) return <div className="text-center text-red-500 mt-6">{error}</div>;

  // So sánh userId trong URL và userId của mình
  const isOwnProfile = currentUserId === username;

  return <Profile isOwnProfile={isOwnProfile} profileData={profileData} />;
}

export default ProfileActivity;

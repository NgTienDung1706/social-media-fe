import { useEffect, useState } from "react";
import { getProfile } from "@/features/profile/profileAPI";
import defaultavatar from "@/assets/defaultavatar.png";
import { FaEdit, FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaSteam, FaPlaystation, FaXbox, FaSpotify, FaYoutube, FaDiscord } from "react-icons/fa";
import UserPostList from '@/features/posts/components/UserPostList';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("posts"); // State to manage the active tab

  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.user);
      } catch (err) {
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
    <div className="w-full min-h-screen bg-white flex flex-col md:flex-row items-stretch justify-center">
      {/* Left: Profile Card */}
      <div className="md:w-1/3 w-full bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start relative md:mr-8 h-auto justify-start sticky top-4 self-start">
        <div className="w-32 h-32 rounded-full bg-brand-green flex items-center justify-center relative mb-2 self-center">
          <img
            src={profile.profile.avatar || defaultavatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
          />
          <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <div className="text-xl font-bold mb-5 mt-2 text-center self-center">{`${profile?.profile?.lastname || ""} ${profile?.profile?.firstname || ""}`}</div>

        {/* Thống kê số bài viết, số bạn bè */}
        <div className="flex w-full mb-4 mt-2 px-6">
          <div className="flex-1 flex flex-col items-center">
            <span className="text-lg font-bold text-gray-800">{profile.postCount ?? 0}</span>
            <span className="text-xs text-gray-500">Bài viết</span>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <span className="text-lg font-bold text-gray-800">{profile.followerCount ?? 0}</span>
            <span className="text-xs text-gray-500">Người theo dõi</span>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <span className="text-lg font-bold text-gray-800">{profile.followingCount ?? 0}</span>
            <span className="text-xs text-gray-500">Đang theo dõi</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="text-gray-500 text-sm">{profile.username}</div>
          {/* Icon giới tính */}
          <div className="mb-2">
            {profile.profile.gender === 'male' && <span title="Nam" className="text-blue-500 text-lg">♂️</span>}
            {profile.profile.gender === 'female' && <span title="Nữ" className="text-pink-500 text-lg">♀️</span>}
            {(!profile.profile.gender || (profile.profile.gender !== 'male' && profile.profile.gender !== 'female')) && <span title="Khác" className="text-gray-400 text-lg">⚧️</span>}
          </div>
        </div>
        <div className="flex gap-2 mb-4">
        <button
          className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium"
          onClick={() => navigate('/edit-profile', {
            state: {
              avatar: profile.profile.avatar,
              username: profile.username,
              lastname: profile.profile?.lastname,
              firstname: profile.profile?.firstname,
              birthday: profile.profile?.birthday,
              bio: profile.profile?.bio
            }
          })}
        >
          <FaEdit /> Sửa Hồ Sơ
        </button>
          <button className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium">
            <FaUserFriends />
          </button>
        </div>

        <div className="text-xs text-gray-400 mb-2">Ngày Sinh</div>
        <div className="text-sm font-medium mb-4">{profile.profile.birthday ? new Date(profile.profile.birthday).toLocaleDateString('vi-VN') : '---'}</div>

        <div className="text-xs text-gray-400 mb-2">Giới thiệu bản thân</div>
        <div className="text-sm font-medium mb-4 whitespace-pre-line">{profile.profile.bio}</div>

        <div className="text-xs text-gray-400 mb-2">Gia Nhập Từ</div>
        <div className="text-sm font-medium mb-4">{profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('vi-VN') : '---'}</div>

      </div>
      {/* Right: Activity & Connections */}
      <div className="md:w-2/3 w-full bg-white rounded-2xl shadow-lg p-8 flex flex-col h-auto justify-center">
        {/* Tabs */}
        <div className="border-b border-gray-300 pb-2 mb-4 flex gap-6">
          <button
            className={`text-lg font-semibold pb-2 border-b-2 transition-colors ${tab === 'posts' ? 'text-blue-600 border-blue-600' : 'text-gray-800 border-transparent'}`}
            onClick={() => setTab('posts')}
          >
            Bài viết
          </button>
          <button
            className={`text-lg font-semibold pb-2 border-b-2 transition-colors ${tab === 'albums' ? 'text-blue-600 border-blue-600' : 'text-gray-800 border-transparent'}`}
            onClick={() => setTab('albums')}
          >
            Album
          </button>
        </div>
        {/* Tab content */}
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          {tab === 'posts' ? (
            <div className="w-full">
              <UserPostList />
            </div>
          ) : (
            <div className="w-full">
              {/* Danh sách album - thay thế bằng component hoặc map dữ liệu thực tế */}
              <div className="text-gray-500 text-center">Chưa có album nào.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

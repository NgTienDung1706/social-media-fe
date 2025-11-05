import { useEffect, useState } from "react";
import StickyBox from "react-sticky-box";
import { getProfile } from "@/features/profile/profileAPI";
import defaultavatar from "@/assets/defaultavatar.png";
import {
  FaEdit,
  FaUserShield,
  FaFlag,
  FaBorderAll,
  FaBookmark,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserPostList from "@/features/posts/components/UserPostList";
import FollowingList from "@/features/profile/components/FollowingList";
import FollowerList from "@/features/profile/components/FollowerList";
import OptionsMenu from "@/components/common/OptionsMenu";

function formatDateDDMMYYYY(dateStr) {
  if (!dateStr) return "---";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "---";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function Profile({ isOwnProfile = true, profileData = null }) {
  const [profile, setProfile] = useState(profileData);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("posts"); // State to manage the active tab
  const [hoverTab, setHoverTab] = useState(null); // Theo dõi tab được hover
  const [showFollowingList, setShowFollowingList] = useState(false);
  const [showFollowerList, setShowFollowerList] = useState(false);

  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!profileData && isOwnProfile) {
      // Nếu đang xem profile của chính mình -> gọi API getProfile()
      const fetchProfile = async () => {
        try {
          const res = await getProfile();
          setProfile(res.user);
        } catch (err) {
          setError(err?.message || "Đã xảy ra lỗi");
        }
      };
      fetchProfile();
    }
  }, [isOwnProfile, profileData]);

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }
  if (!profile) {
    return <div className="text-center mt-4">Đang tải thông tin...</div>;
  }

  const handleOptionSelect = async (action) => {
    switch (action) {
      case "edit":
        alert("Chức năng chỉnh sửa trang chưa được triển khai");
        break;
      case "block":
        alert("Đã chặn người dùng này");
        break;
      case "report":
        alert("Đã gửi báo cáo người dùng");
        break;
      default:
        console.log(`Action ${action} not handled`);
    }
  };

  const profileOptions = [
    {
      icon: <FaEdit />,
      label: "Chỉnh sửa trang",
      action: () => handleOptionSelect("edit"),
    },
    {
      icon: <FaUserShield />,
      label: "Chặn người dùng",
      action: () => handleOptionSelect("block"),
    },
    {
      icon: <FaFlag />,
      label: "Báo cáo",
      action: () => handleOptionSelect("report"),
    },
  ];

  // Tính toán vị trí của thanh gạch dựa trên tab active hoặc hover
  const getTabPosition = () => {
    const tabs = ["posts", "saved"];
    const index = hoverTab ? tabs.indexOf(hoverTab) : tabs.indexOf(tab);
    return {
      left: `${(index * 100) / tabs.length}%`,
      width: `${100 / tabs.length}%`,
    };
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-row justify-center gap-8">
      {/* Left: Profile Card */}
      <div className="w-[350px]">
        <StickyBox offsetTop={40} offsetBottom={20}>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start">
            {/* <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-brand-green to-brand-blue blur-lg opacity-40 -z-10"></div> */}
            <div className="w-32 h-32 rounded-full bg-brand-green flex items-center justify-center relative mb-2 self-center">
              <img
                src={profile.profile.avatar || defaultavatar}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
              />
              <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="text-xl font-bold mb-5 mt-2 text-center self-center">{`${
              profile?.profile?.lastname || ""
            } ${profile?.profile?.firstname || ""}`}</div>

            {/* Thống kê số bài viết, số bạn bè */}
            <div className="flex w-full mb-4 mt-2 px-6">
              <div className="flex-1 flex flex-col items-center">
                <span className="text-lg font-bold text-gray-800">
                  {profile.postCount ?? 0}
                </span>
                <span className="text-xs text-gray-500 font-semibold">
                  Bài viết
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center cursor-pointer">
                <span
                  className="text-lg font-bold text-gray-800"
                  onClick={() => setShowFollowerList(true)} // mở FollowerList khi click
                >
                  {profile.followerCount ?? 0}
                </span>
                <span
                  className="text-xs text-gray-500 font-semibold"
                  onClick={() => setShowFollowerList(true)} // mở FollowerList khi click
                >
                  Người theo dõi
                </span>
              </div>

              <div className="flex-1 flex flex-col items-center cursor-pointer">
                <span
                  className="text-lg font-bold text-gray-800"
                  onClick={() => setShowFollowingList(true)} // mở FollowingList khi click
                >
                  {profile.followingCount ?? 0}
                </span>
                <span
                  className="text-xs text-gray-500 font-semibold"
                  onClick={() => setShowFollowingList(true)} // mở FollowingList khi click
                >
                  Đang theo dõi
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <div className="text-gray-500 text-sm">{profile.username}</div>
              {/* Icon giới tính */}
              <div className="mb-2">
                {profile.profile.gender === "male" && (
                  <span title="Nam" className="text-blue-500 text-lg">
                    ♂️
                  </span>
                )}
                {profile.profile.gender === "female" && (
                  <span title="Nữ" className="text-pink-500 text-lg">
                    ♀️
                  </span>
                )}
                {(!profile.profile.gender ||
                  (profile.profile.gender !== "male" &&
                    profile.profile.gender !== "female")) && (
                  <span title="Khác" className="text-gray-400 text-lg">
                    ⚧️
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2 mb-4 justify-between w-full">
              {isOwnProfile ? (
                <button
                  className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium"
                  onClick={() =>
                    navigate("/edit-profile", {
                      state: {
                        avatar: profile.profile.avatar,
                        username: profile.username,
                        lastname: profile.profile?.lastname,
                        firstname: profile.profile?.firstname,
                        birthday: profile.profile?.birthday,
                        bio: profile.profile?.bio,
                      },
                    })
                  }
                >
                  <FaEdit /> Sửa Hồ Sơ
                </button>
              ) : (
                <>
                  <button className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-lg text-sm font-medium">
                    Kết bạn
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                    Nhắn tin
                  </button>
                </>
              )}
              <OptionsMenu options={profileOptions} />
            </div>

            <div className="text-xs text-gray-400 mb-2">Ngày Sinh</div>
            <div className="text-sm font-medium mb-4">
              {formatDateDDMMYYYY(profile.profile.birthday)}
            </div>

            <div className="text-xs text-gray-400 mb-2">
              Giới thiệu bản thân
            </div>
            <div className="text-sm font-medium mb-4 whitespace-pre-line">
              {profile.profile.bio}
            </div>

            <div className="text-xs text-gray-400 mb-2">Gia Nhập Từ</div>
            <div className="text-sm font-medium mb-4">
              {formatDateDDMMYYYY(profile.createdAt)}
            </div>
          </div>
        </StickyBox>
      </div>
      {/* Right: Activity & Connections */}
      <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 flex flex-col h-auto justify-center">
        {/* Tabs */}
        <div className="bg-white text-black p-2 relative">
          <div className="flex justify-around">
            <button
              className={`relative p-2 flex font-semibold items-center justify-center gap-1 transition-colors duration-300 w-full ${
                tab === "posts" ? "text-black" : "text-gray-600"
              }`}
              onClick={() => setTab("posts")}
              onMouseEnter={() => setHoverTab("posts")}
              onMouseLeave={() => setHoverTab(null)}
              title="Post"
            >
              <FaBorderAll className="text-lg" /> Bài viết
            </button>
            <button
              className={`relative p-2 flex font-semibold items-center justify-center gap-1 transition-colors duration-300 w-full ${
                tab === "saved" ? "text-black" : "text-gray-600"
              }`}
              onClick={() => setTab("saved")}
              onMouseEnter={() => setHoverTab("saved")}
              onMouseLeave={() => setHoverTab(null)}
              title="Đã lưu"
            >
              <FaBookmark className="text-lg" /> Đã lưu
            </button>
          </div>
          <div
            className="absolute bottom-0 h-1 bg-gradient-to-r from-brand-green to-brand-blue transition-all duration-300 ease-in-out rounded-full"
            style={{
              left: getTabPosition().left,
              width: getTabPosition().width,
            }}
          />
        </div>
        {/* Tab content */}
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          {tab === "posts" ? (
            <div className="w-full">
              <UserPostList
                username={!isOwnProfile ? profile.username : undefined}
              />
            </div>
          ) : (
            <div className="w-full">
              <div className="text-gray-500 text-center">
                Chưa có bài viết nào được lưu.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FollowingList modal */}
      {showFollowingList && (
        <FollowingList
          username={isOwnProfile ? currentUser.username : profile.username}
          onClose={() => setShowFollowingList(false)}
        />
      )}
      {/* FollowerList modal */}
      {showFollowerList && (
        <FollowerList
          username={isOwnProfile ? currentUser.username : profile.username}
          onClose={() => setShowFollowerList(false)}
        />
      )}
    </div>
  );
}

export default Profile;

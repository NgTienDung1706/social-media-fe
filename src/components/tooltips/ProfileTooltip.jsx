import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByUsername } from "@/redux/usersSlice";

const ProfileTooltip = ({ userid, username }) => {
  const dispatch = useDispatch();

  // Lấy user từ redux store theo userId
  const currentUser = useSelector((state) => state.users.entities[userid]);
  const status = useSelector(
    (state) => state.users.status[userid] || state.users.status[username]
  );

  // Local state cho follow/unfollow (có thể sync với backend sau)
  const [isFollowing, setIsFollowing] = useState(
    currentUser?.relationship_status?.following || false
  );

  useEffect(() => {
    // Nếu chưa có dữ liệu user thì fetch
    if (!currentUser && status !== "loading") {
      dispatch(fetchUserByUsername(username));
    }
  }, [userid, username, currentUser, status, dispatch]);

  useEffect(() => {
    if (currentUser?.relationship_status?.following !== undefined) {
      setIsFollowing(currentUser.relationship_status.following);
    }
  }, [currentUser]);

  if (status === "loading" || !currentUser) {
    return <div className="p-3 bg-white shadow-lg rounded-lg">Đang tải...</div>;
  }

  const handleMessage = () => {
    console.log("Nhắn tin cho:", username);
    // TODO: mở khung chat ở đây
  };

  const handleFollowToggle = () => {
    const newStatus = !isFollowing;
    setIsFollowing(newStatus);
    console.log(
      newStatus ? `Đang theo dõi ${username}` : `Bỏ theo dõi ${username}`
    );
    // TODO: gọi API follow/unfollow ở đây
  };

  return (
    <div className="rounded-xl shadow-lg bg-white p-4 w-[350px]">
      {/* Avatar + tên */}
      <div className="flex flex-col items-center">
        <img
          src={currentUser.profile.avatar || "/assets/default_avatar.png"}
          alt={username}
          className="w-16 h-16 rounded-full object-cover mb-2"
        />
        <div className="font-semibold text-lg flex items-center gap-1">
          {currentUser.username}
          {currentUser.isVerified && (
            <img
              src="/assets/verified_icon.png"
              alt="verified"
              className="w-4 h-4"
            />
          )}
        </div>
        <div className="text-gray-500 text-sm mb-2">
          {currentUser.profile.lastname} {currentUser.profile.firstname}
        </div>
      </div>

      {/* Thống kê */}
      <div className="flex justify-around my-3">
        <div className="text-center">
          <div className="font-bold">{currentUser.postCount || 0}</div>
          <div className="text-xs text-gray-500">bài viết</div>
        </div>
        <div className="text-center">
          <div className="font-bold">{currentUser.followerCount || 0}</div>
          <div className="text-xs text-gray-500">người theo dõi</div>
        </div>
        <div className="text-center">
          <div className="font-bold">{currentUser.followingCount || 0}</div>
          <div className="text-xs text-gray-500">đang theo dõi</div>
        </div>
      </div>

      {/* Action buttons */}
      {!currentUser.relationship_status?.isMe && (
        <div className="flex gap-2 mt-4">
          <button
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            onClick={handleMessage}
          >
            Nhắn tin
          </button>
          <button
            className={`flex-1 py-2 rounded-lg font-semibold border transition ${
              isFollowing
                ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={handleFollowToggle}
          >
            {isFollowing ? "Đang theo dõi" : "Theo dõi"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileTooltip;

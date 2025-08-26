import React, { useState, forwardRef } from "react";

const FollowingItem = forwardRef(({ user: initialUser }, ref) => {
  // Tạo state cục bộ để quản lý trạng thái following
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(false);

  const handleUnfollow = async (userId) => {
    setLoading(true);
    // Giả lập gọi API với setTimeout
    setTimeout(() => {
      // Sau khi "API trả về thành công", thay đổi trạng thái following
      setUser((prev) => ({
        ...prev,
        relationship_status: {
          ...prev.relationship_status,
          following: false,
        },
      }));
      setLoading(false);
    }, 1000); // giả lập 1s delay
  };
  const handleFollow = async (userId) => {
    setLoading(true);
    // Giả lập gọi API với setTimeout
    setTimeout(() => {
      // Sau khi "API trả về thành công", thay đổi trạng thái following
      setUser((prev) => ({
        ...prev,
        relationship_status: {
          ...prev.relationship_status,
          following: true,
        },
      }));
      setLoading(false);
    }, 1000); // giả lập 1s delay
  };

  return (
    <div
      ref={ref}
      className="flex items-center justify-between py-2 px-2 hover:bg-gray-50 rounded-lg mb-1"
    >
      <div className="flex items-center gap-3">
        <img
          src={user.avatar || "/assets/default_avatar.png"}
          alt={user.username}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-medium">{user.username}</div>
          <div className="text-sm text-gray-500">
            {user.lastname} {user.firstname}
          </div>
        </div>
      </div>
      <button
        className={`px-4 py-1 rounded-full font-semibold border ${
          user.relationship_status?.following
            ? "bg-gray-100 text-gray-700 border-gray-300 cursor-default"
            : "bg-blue-500 text-white border-blue-600 hover:bg-blue-600"
        }`}
        onClick={() =>
          user.relationship_status?.following
            ? handleUnfollow(user._id)
            : handleFollow(user._id)
        }
        disabled={loading} // disable khi đang "API call"
      >
        {loading
          ? "Đang xử lý..."
          : user.relationship_status?.following
          ? "Đang theo dõi"
          : "Theo dõi"}
      </button>
    </div>
  );
});

export default FollowingItem;

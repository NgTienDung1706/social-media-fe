import React, { useState, forwardRef } from "react";
import {
  followUser,
  unfollowUser,
  removeFollower,
} from "@/features/profile/profileAPI";
import { useConfirmModal } from "@/contexts/ConfirmModalContext";

const UserFollowItem = forwardRef(
  ({ user: initialUser, mode = "following" }, ref) => {
    const [user, setUser] = useState(initialUser);
    const [loading, setLoading] = useState(false);
    const { openConfirm } = useConfirmModal();

    const handleUnfollow = async (userId) => {
      openConfirm(
        "Xác nhận bỏ theo dõi",
        "Bạn có chắc muốn bỏ theo dõi người này không?",
        async () => {
          setLoading(true);
          const res = await unfollowUser(userId);
          if (res) {
            setUser((prev) => ({
              ...prev,
              relationship_status: {
                ...prev.relationship_status,
                following: false,
              },
            }));
          }
          setLoading(false);
        }
      );
    };

    const handleFollow = async (userId) => {
      openConfirm(
        "Xác nhận theo dõi",
        "Bạn có chắc muốn theo dõi người này không?",
        async () => {
          setLoading(true);
          const res = await followUser(userId);
          if (res) {
            setUser((prev) => ({
              ...prev,
              relationship_status: {
                ...prev.relationship_status,
                following: true,
              },
            }));
          }
          setLoading(false);
        }
      );
    };

    const handleRemoveFollower = async (userId) => {
      openConfirm(
        "Xác nhận xóa người theo dõi",
        "Bạn có chắc muốn xóa người này khỏi danh sách follower không?",
        async () => {
          setLoading(true);
          const res = await removeFollower(userId);
          if (res) {
            // Tuỳ bạn: có thể xoá hẳn khỏi danh sách ở parent hoặc disable nút
            setUser((prev) => ({
              ...prev,
              relationship_status: {
                ...prev.relationship_status,
                removed: true,
              },
            }));
          }
          setLoading(false);
        }
      );
    };

    if (user.relationship_status?.removed) {
      return null; // ẩn khỏi danh sách sau khi xoá follower
    }

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

        {/* Chỉ hiển thị nút khi KHÔNG phải là chính mình */}
        {!user.relationship_status?.isMe && (
          <div className="flex gap-2">
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
              disabled={loading}
            >
              {loading
                ? "Đang xử lý..."
                : user.relationship_status?.following
                ? "Đang theo dõi"
                : "Theo dõi"}
            </button>

            {mode === "follower" && (
              <button
                className="px-3 py-1 rounded-full font-semibold border bg-red-100 text-red-600 border-red-300 hover:bg-red-200"
                onClick={() => handleRemoveFollower(user._id)}
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Xóa"}
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

export default UserFollowItem;

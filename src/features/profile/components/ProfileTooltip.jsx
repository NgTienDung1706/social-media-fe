import React from "react";

const ProfileTooltip = ({
  avatar,
  username,
  fullname,
  postCount,
  followersCount,
  followingCount,
  onMessage,
  onFollow,
  isFollowing
}) => (
  <div className="rounded-xl shadow-lg bg-white p-4 w-80">
    <div className="flex flex-col items-center">
      <img
        src={avatar || "/assets/default_avatar.png"}
        alt={username}
        className="w-16 h-16 rounded-full object-cover mb-2"
      />
      <div className="font-semibold text-lg">{username}</div>
      <div className="text-gray-500 text-sm mb-2">{fullname}</div>
    </div>
    <div className="flex justify-around my-3">
      <div className="text-center">
        <div className="font-bold">{postCount}</div>
        <div className="text-xs text-gray-500">bài viết</div>
      </div>
      <div className="text-center">
        <div className="font-bold">{followersCount}</div>
        <div className="text-xs text-gray-500">người theo dõi</div>
      </div>
      <div className="text-center">
        <div className="font-bold">{followingCount}</div>
        <div className="text-xs text-gray-500">đang theo dõi</div>
      </div>
    </div>
    <div className="flex gap-2 mt-4">
      <button
        className={`flex-1 py-2 rounded-lg font-semibold border ${isFollowing ? 'bg-gray-200 text-gray-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        onClick={onFollow}
      >
        {isFollowing ? 'Đang theo dõi' : 'Theo dõi'}
      </button>
      <button
        className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
        onClick={onMessage}
      >
        Nhắn tin
      </button>
    </div>
  </div>
);

export default ProfileTooltip;

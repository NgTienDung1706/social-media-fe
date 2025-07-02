import { FaRegHeart, FaRegComment, FaRegShareSquare } from "react-icons/fa";

function PostItem({ avatar, username, time, image, caption, likes, comments }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <img
          src={avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full max-w-full"
        />
        <span className="font-semibold text-gray-900">{username}</span>
        <span className="text-xs text-gray-500 ml-2">{time}</span>
      </div>

      {/* Image */}
      <img
        src={image}
        alt="post"
        className="w-full rounded-lg mb-2 max-w-full object-cover"
      />

      {/* Action Buttons */}
      <div className="flex gap-6 text-xl text-gray-700 mb-2">
        <button className="hover:text-pink-500 transition-colors">
          <FaRegHeart />
        </button>
        <button className="hover:text-blue-500 transition-colors">
          <FaRegComment />
        </button>
        <button className="hover:text-green-600 transition-colors">
          <FaRegShareSquare />
        </button>
      </div>

      {/* Caption */}
      <div className="text-gray-800 text-sm mb-1">
        {caption}
      </div>

      {/* Stats */}
      <div className="text-xs text-gray-500">
        {likes} lượt thích • {comments} bình luận
      </div>
    </div>
  );
}

export default PostItem;

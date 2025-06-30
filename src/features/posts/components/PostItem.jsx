// src/features/home/components/PostItem.jsx
function PostItem() {
  return (
    <div className="bg-white rounded-lg shadow p-4 max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          className="w-10 h-10 rounded-full max-w-full"
          alt="avatar"
        />
        <span className="font-semibold text-gray-900">_seorina</span>
        <span className="text-xs text-gray-500 ml-2">8 giờ</span>
      </div>
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
        className="w-full rounded-lg mb-2 max-w-full object-cover"
        alt="post"
      />
      <div className="text-gray-800 text-sm mb-1">
        Cảm ơn mọi người đã ủng hộ!
      </div>
      <div className="text-xs text-gray-500">
        189.380 lượt thích • 565 bình luận
      </div>
    </div>
  );
}

export default PostItem;

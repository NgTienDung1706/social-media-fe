import React from "react";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-gray-600 px-6">
      <div className="mb-6">
        <div className="w-36 h-36 rounded-full border-2 border-gray-300 flex items-center justify-center text-4xl">
          💬
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">
        Tin nhắn của bạn
      </h2>
      <p className="mb-4">Gửi ảnh và tin nhắn riêng tư cho bạn bè hoặc nhóm</p>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
        Gửi tin nhắn
      </button>
    </div>
  );
}

export default EmptyState;

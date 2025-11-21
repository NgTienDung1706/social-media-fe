import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "./EmptyState";
import { fetchMessages } from "@/redux/chatSlice";

function ChatArea({ conversationId }) {
  const dispatch = useDispatch();
  const messages = useSelector(
    (state) => state.chat.messages[conversationId]?.items || []
  );

  useEffect(() => {
    if (conversationId) {
      dispatch(fetchMessages({ conversationId }));
    }
  }, [conversationId, dispatch]);

  if (!conversationId) {
    return (
      <div className="flex-1">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between relative">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
              {/* Avatar */}
              <img
                src="https://via.placeholder.com/40x40/8B0000/FFFFFF?text=TD"
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-gray-900 truncate">userName</div>
            <div className="text-xs text-gray-500 truncate">userStatus</div>
            <div className="text-xs text-gray-400 truncate">userHandle</div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        {/* Menu chi tiết nếu cần, nhưng ảnh thứ 2 có toggle notifications */}
        <div className="absolute right-0 top-full mt-1 bg-white border rounded-lg shadow-lg p-2 hidden group-hover:block">
          {/* Nội dung menu nếu mở */}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {/* Date separator nếu cần */}
        {messages.length > 0 && (
          <div className="text-center">
            <div className="inline-block px-3 py-1 bg-white rounded-full text-xs text-gray-400 border">
              Hôm nay
            </div>
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender !== "me" && (
              <div className="w-8 h-8 bg-red-500 rounded-full flex-shrink-0 mr-2">
                <img
                  src={msg.avatar}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            )}
            <div
              className={`max-w-xs lg:max-w-md ${
                msg.sender === "me" ? "order-2" : ""
              }`}
            >
              {msg.sender !== "me" && (
                <div className="text-xs text-gray-500 mb-1 ml-2">userName</div>
              )}
              <div
                className={`px-3 py-2 rounded-lg text-sm ${
                  msg.sender === "me"
                    ? "bg-indigo-600 text-white ml-auto"
                    : "bg-white text-gray-900 border border-gray-200"
                }`}
              >
                <pre className="whitespace-pre-wrap break-words">
                  {msg.text}
                </pre>
              </div>
              <div
                className={`text-xs text-gray-400 mt-1 ${
                  msg.sender === "me" ? "text-right" : "text-left"
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
            {msg.sender === "me" && (
              <div className="w-8 h-8 bg-blue-500 rounded-full flex-shrink-0 ml-2">
                <img
                  src={msg.avatar}
                  alt="My Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
        {/* Timestamp tổng nếu cần */}
        <div className="text-center text-xs text-gray-400 mt-4">
          20:36 28 Thg 9, 2025
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="max-w-4xl mx-auto flex items-end gap-2">
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <span role="img" aria-label="Emoji">
              😀
            </span>
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full rounded-2xl bg-gray-100 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Nhắn tin..."
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </button>
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <span role="img" aria-label="Heart">
              ❤️
            </span>
          </button>
          <button className="bg-indigo-600 text-white p-3 rounded-2xl hover:bg-indigo-700">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-2-9-7 7-2-9-9 2 7-7 2 9 7-7 2 9z"
              />
            </svg>
          </button>
        </div>
        {/* Các option như Xóa đoạn chat nếu cần */}
        <div className="flex justify-end mt-2 text-xs text-red-500">
          <button>Xóa đoạn chat</button>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;

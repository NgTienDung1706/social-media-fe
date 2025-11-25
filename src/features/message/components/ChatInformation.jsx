import { useSelector } from "react-redux";
import { FaCaretSquareLeft } from "react-icons/fa";

function ChatInformation({ isOpen, onClose }) {
  if (!isOpen) return null;

  // Lấy data từ Redux hoặc mock (thay bằng real data)
  const conversationId = useSelector(
    (state) => state.chat.activeConversationId
  );
  const userInfo = useSelector(
    (state) =>
      state.chat.conversations?.[conversationId] || {
        // Giả sử có data ở đây
        name: "Trần Xuân Quang",
        username: "xuanquang10",
        status: "Hoạt động 22 phút trước",
        avatar: "/path/to/avatar.jpg", // URL avatar
        platform: "Instagram",
      }
  );

  return (
    <div className="w-96 h-full flex flex-col border-l border-gray-200 bg-white">
      {" "}
      {/* Fit với sidebarWidth */}
      {/* Header với close */}
      <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between h-16 w-full">
          <h3 className="text-lg font-semibold">Chi tiết</h3>
          <div
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <FaCaretSquareLeft className="w-6 h-6 transform rotate-180" />
          </div>
        </div>
      </div>
      {/* Nội dung chính */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Avatar & Info */}
      </div>
    </div>
  );
}

export default ChatInformation;

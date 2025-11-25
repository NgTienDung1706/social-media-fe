import { useSelector } from "react-redux";
import UserAvatar from "@/features/message/components/UserAvatar";

import { FaPhoneAlt, FaVideo, FaInfoCircle } from "react-icons/fa";

const ChatWindowHeader = ({ chat, onInfoClick }) => {
  const me = useSelector((state) => state.auth.login.currentUser);
  const chatSlice = useSelector((state) => state.chat);
  const { onlineUsers } = useSelector((state) => state.socket);

  const activeConversationId = chatSlice.activeConversationId;
  const conversations = chatSlice.conversations;

  chat = chat ?? conversations.find((c) => c._id === activeConversationId);
  let otherUser;
  let isOnline = false;

  if (!chat) {
    return <div>ChatWindowHeader</div>;
  }

  if (chat.type === "direct") {
    const otherParticipant = chat.participants.filter((p) => p._id !== me._id);
    otherUser = otherParticipant.length > 0 ? otherParticipant[0] : null;

    isOnline = otherUser ? onlineUsers.includes(otherUser._id) : false;

    if (!me || !otherUser) {
      return <div>ChatWindowHeader</div>;
    }
  }

  return (
    <header className="sticky z-10 px-4 py-2 flex items-center justify-between bg-white border-b border-gray-200">
      <div className="flex items-center p-2 gap-3">
        {chat.type === "direct" ? (
          <UserAvatar
            name={otherUser?.fullname}
            avatarUrl={otherUser?.avatar}
            isOnline={isOnline}
          />
        ) : (
          <div>Group Chat</div>
        )}
        <div>
          <h2 className="text-md font-semibold">
            {chat.type === "direct"
              ? otherUser?.fullname
              : chat.group?.name || "Group Chat"}
          </h2>
        </div>
      </div>

      <div className="flex items-center">
        {/* Nút hành động (gọi video, gọi thoại, thông tin cuộc trò chuyện, v.v.) */}
        <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
          <FaPhoneAlt className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="pl-2 pr-1 py-1 rounded-full hover:bg-gray-100 cursor-pointer">
          <FaVideo className="w-8 h-8 cursor-pointer" />
        </div>
        <div
          className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
          onClick={onInfoClick}
        >
          <FaInfoCircle className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default ChatWindowHeader;

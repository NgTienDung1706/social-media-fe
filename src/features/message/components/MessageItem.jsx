import UserAvatar from "@/features/message/components/UserAvatar";
import { formatMessageTime } from "@/utils/messageUtils";

const MessageItem = ({
  message,
  index,
  messages,
  selectedConversation,
  lastMessageStatus,
}) => {
  const prev = messages[index - 1];

  const isGroupBreak =
    index === 0 ||
    (prev && prev.senderId !== message.senderId) ||
    new Date(message.createdAt).getTime() -
      new Date(prev?.createdAt || 0).getTime() >
      300000; // 5 phút

  const participant = selectedConversation?.participants.find(
    (p) => p._id.toString() === message.senderId.toString()
  );

  return (
    <>
      {/* Thời gian - Giữa màn hình nếu group break */}
      {isGroupBreak && (
        <div className="w-full flex justify-center mb-2 px-4">
          <span className="px-3 py-1 text-xs text-gray-500 font-medium">
            {formatMessageTime(new Date(message.createdAt))}
          </span>
        </div>
      )}

      <div
        className={`flex gap-2 message-bounce mb-1 ${
          message.isOwn ? "justify-end mr-4" : "justify-start"
        }`}
      >
        {/* Avatar */}
        {!message.isOwn && (
          <div className="w-12">
            {isGroupBreak && (
              <UserAvatar
                name={participant?.fullname}
                avatarUrl={participant?.avatar}
                isOnline={false}
              />
            )}
          </div>
        )}
        {/* Message */}
        <div
          className={`max-w-xs lg:max-w-md space-y-1 flex flex-col ${
            message.isOwn ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`${
              message.isOwn
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            } px-3 py-2 rounded-xl`}
          >
            <p className="text-sm leading-relaxed break-words whitespace-pre-line">
              {message.content}
            </p>
          </div>

          {/* Seen / Delivered - Giữ nguyên */}
          {message.isOwn &&
            message._id === selectedConversation?.lastMessage?._id && (
              <span className="text-xs text-muted-foreground px-1 font-medium text-gray-500">
                {lastMessageStatus === "seen" ? "Đã xem" : "Đã gửi"}
              </span>
            )}
        </div>
      </div>
    </>
  );
};

export default MessageItem;

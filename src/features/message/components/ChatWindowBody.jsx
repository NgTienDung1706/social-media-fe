import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import ChatWelcomeScreen from "@/features/message/components/ChatWelcomeScreen";
import MessageItem from "@/features/message/components/MessageItem";

const ChatWindowBody = () => {
  const chatSlice = useSelector((state) => state.chat);
  const activeConversationId = chatSlice.activeConversationId;
  const conversations = chatSlice.conversations;

  const messages = useSelector(
    (state) => state.chat.messages[activeConversationId]?.items || []
  );

  const selectedConversation = conversations.find(
    (conv) => conv._id === activeConversationId
  );

  // Ref cho phần tử cuối cùng (anchor để scroll đến bottom)
  const messagesEndRef = useRef(null);

  // Auto-scroll đến bottom khi messages thay đổi (mở chat hoặc tin mới)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" }); // Hoặc "smooth" nếu muốn mượt
  }, [messages]); // Dependency: Chạy mỗi khi messages array thay đổi

  if (!selectedConversation) {
    return <ChatWelcomeScreen />;
  }

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-muted-foreground">
        Cuộc trò chuyện trống. Bắt đầu gửi tin nhắn!
      </div>
    );
  }
  return (
    <div className="p-4 bg-white h-full flex flex-col overflow-hidden">
      <div className="flex flex-col overflow-y-auto overflow-x-hidden beautiful-scrollbar">
        {messages.map((message, index) => (
          <MessageItem
            key={message._id}
            message={message}
            index={index}
            messages={messages}
            selectedConversation={selectedConversation}
            lastMessageStatus={"delivered"}
          />
        ))}
        <div ref={messagesEndRef} /> {/* Anchor để scroll đến bottom */}
      </div>
    </div>
  );
};

export default ChatWindowBody;

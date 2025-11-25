import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatWelcomeScreen from "@/features/message/components/ChatWelcomeScreen";
import { fetchMessages } from "@/redux/chatSlice";
import ChatWindowHeader from "@/features/message/components/ChatWindowHeader";
import ChatWindowBody from "@/features/message/components/ChatWindowBody";
import MessageInput from "@/features/message/components/MessageInput";
import ChatInformation from "@/features/message/components/ChatInformation";

function ChatArea() {
  const dispatch = useDispatch();
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const chat = useSelector((state) => state.chat);
  const conversationId = chat.activeConversationId;
  //const messageLoading = chat.messageLoading;
  const selectedConversation = chat.conversations.find(
    (c) => c._id === conversationId
  );

  const messages = useSelector(
    (state) => state.chat.messages[conversationId]?.items || []
  );

  useEffect(() => {
    if (conversationId && messages.length === 0) {
      dispatch(fetchMessages({ conversationId }));
    }
  }, [conversationId, dispatch]);

  if (!conversationId) {
    return (
      <div className="flex-1">
        <ChatWelcomeScreen />
      </div>
    );
  }

  const handleInfoClick = () => {
    setIsInfoOpen(!isInfoOpen); // Toggle
  };

  const handleCloseInfo = () => {
    setIsInfoOpen(false);
  };

  return (
    <div className="flex h-full flex-1 overflow-hidden rounded-sm shadow-md relative">
      {/* Nội dung chính chat - Push khi sidebar mở */}
      <div className="flex flex-col h-full flex-1 overflow-hidden rounded-sm shadow-md">
        {/* Header */}
        <ChatWindowHeader onInfoClick={handleInfoClick} />
        {/* Body */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <ChatWindowBody />
        </div>
        {/* Footer */}
        {/* Input wrapper: Không co lại, dính dưới cùng, expand sẽ đẩy body lên */}
        <div className="flex-shrink-0">
          <MessageInput selectedConversation={selectedConversation} />
        </div>
      </div>

      {isInfoOpen && (
        <ChatInformation isOpen={isInfoOpen} onClose={handleCloseInfo} />
      )}
    </div>
  );
}

export default ChatArea;

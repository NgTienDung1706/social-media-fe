import { useDispatch, useSelector } from "react-redux";
import AppSidebarMin from "@/components/AppSidebarMin";
import MessagesSidebar from "@/features/message/components/MessagesSidebar";
import ChatArea from "@/features/message/components/ChatArea";
import { setActiveConversationId } from "@/redux/chatSlice";
import { selectSocketHelpers } from "@/redux/socketSlice";
import { useEffect } from "react";

function Messenger() {
  const dispatch = useDispatch();
  const socketHelpers = useSelector(selectSocketHelpers);
  const { markAsRead } = socketHelpers || {};

  const activeConversationId = useSelector(
    (state) => state.chat.activeConversationId
  );

  const setActiveConversationIdHandler = (conversationId) => {
    dispatch(setActiveConversationId(conversationId));
    // Chỉ emit nếu socket đã ready
    if (markAsRead) markAsRead(conversationId);
  };

  useEffect(() => {
    if (activeConversationId && markAsRead) {
      markAsRead(activeConversationId);
    }
  }, [activeConversationId, markAsRead]);

  return (
    <>
      <AppSidebarMin />
      <div className="flex h-screen bg-white ml-16 md:ml-20">
        <div className="w-96 border-r border-gray-200">
          <MessagesSidebar
            onSelectConversation={setActiveConversationIdHandler}
            activeId={activeConversationId}
          />
        </div>

        <div className="flex-1">
          <ChatArea />
        </div>
      </div>
    </>
  );
}

export default Messenger;

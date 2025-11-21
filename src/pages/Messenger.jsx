import React, { useState } from "react";
import AppSidebarMin from "@/components/AppSidebarMin";
import MessagesSidebar from "@/features/message/components/MessagesSidebar";
import ChatArea from "@/features/message/components/ChatArea";

function Messenger() {
  const [activeConversationId, setActiveConversationId] = useState(null);

  return (
    <>
      <AppSidebarMin />
      <div className="flex h-screen bg-white ml-16 md:ml-20">
        <div className="w-96 border-r border-gray-200">
          <MessagesSidebar
            onSelectConversation={setActiveConversationId}
            activeId={activeConversationId}
          />
        </div>

        <div className="flex-1">
          <ChatArea conversationId={activeConversationId} />
        </div>
      </div>
    </>
  );
}

export default Messenger;

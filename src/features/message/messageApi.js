import axios from "@/utils/axiosInstance";

const pagelimit = 50;
//Lấy danh sách các cuộc trò chuyện
export const getConversations = async () => {
  const res = await axios.get("/conversation");
  return res || [];
};

export const getMessages = async (conversationId, cursor) => {
  const res = await axios.get(
    `/conversation/${conversationId}/messages?limit=${pagelimit}&cursor=${
      cursor || ""
    }`
  );
  return {
    messages: res.messages || [],
    cursor: res.nextCursor || null,
  };
};

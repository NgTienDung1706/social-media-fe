// src/store/slices/chatSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMessages } from "@/features/message/messageApi.js";

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async ({ conversationId }, thunkAPI) => {
    try {
      const activeConversationId =
        thunkAPI.getState().chat.activeConversationId;
      const messages = thunkAPI.getState().chat.messages;
      const user = thunkAPI.getState().auth.login.currentUser;

      const convoId = conversationId ?? activeConversationId;

      if (!convoId) return;

      const current = messages?.[convoId] || [];
      const nextCursor =
        current?.nextCursor === undefined ? "" : current?.nextCursor;

      if (nextCursor === null) return;

      try {
        const { messages: fetched, cursor } = await getMessages(
          convoId,
          nextCursor
        );

        const processed = fetched.map((m) => ({
          ...m,
          isOwn: m.senderId === user?._id,
        }));

        return { processed, conversationId: convoId, nextCursor: cursor };
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.message || "Fetch messages failed"
        );
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  conversations: [],
  messages: {},
  activeConversationId: null,
  isTyping: false,
  conversationLoading: false,
  messageLoading: false,
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversationId: (state, action) => {
      state.activeConversationId = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setTyping: (state, action) => {
      state.isTyping = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.messageLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messageLoading = false;
        const { processed, conversationId, nextCursor } = action.payload;
        const prev = state.messages[conversationId]?.items ?? [];
        const merged = prev.length > 0 ? [...prev, ...processed] : processed;
        state.messages[conversationId] = {
          items: merged,
          hasMore: !!nextCursor,
          nextCursor: nextCursor ?? null,
        };
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.messageLoading = false;
      });
  },
});

export const {
  setConnected,
  setCurrentRoom,
  addMessage,
  clearMessages,
  setTyping,
} = chatSlice.actions;
export default chatSlice.reducer;

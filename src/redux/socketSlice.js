// src/redux/slices/socketSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
  onlineUsers: [], // Array userIds online, hoặc object { userId: true } nếu cần metadata
  socketHelpers: null, // Chứa các hàm helper để emit sự kiện socket
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload; // e.g., dispatch(setOnlineUsers(['user1', 'user2']))
    },
    addOnlineUser: (state, action) => {
      // Realtime: User join
      const userId = action.payload;
      if (!state.onlineUsers.includes(userId)) {
        state.onlineUsers.push(userId);
      }
    },
    removeOnlineUser: (state, action) => {
      // Realtime: User leave
      const userId = action.payload;
      state.onlineUsers = state.onlineUsers.filter((id) => id !== userId);
    },
    setSocketHelpers: (state, action) => {
      // Thêm reducer mới
      state.socketHelpers = action.payload; // Lưu { markAsRead, joinRoom, ... }
    },
  },
});

export const {
  setConnected,
  setOnlineUsers,
  addOnlineUser,
  removeOnlineUser,
  setSocketHelpers,
} = socketSlice.actions;
export default socketSlice.reducer;

export const selectSocketHelpers = (state) => state.socket.socketHelpers;

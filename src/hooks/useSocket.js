// src/hooks/useSocket.js (cập nhật phần useEffect)
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setConnected, setOnlineUsers } from "@/redux/socketSlice.js"; // Import action

export const useSocket = () => {
  const socketRef = useRef(null);
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth.login);

  useEffect(() => {
    if (!accessToken) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        dispatch(setConnected(false)); // Update Redux khi disconnect
      }
      return;
    }

    socketRef.current = io("http://localhost:3001", {
      withCredentials: true,
      auth: { token: accessToken },
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current.id);
      dispatch(setConnected(true)); // Dispatch vào Redux
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket disconnected");
      dispatch(setConnected(false));
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    // Realtime: Lắng nghe sự kiện user online
    socketRef.current.on("online-users", (userIds) => {
      dispatch(setOnlineUsers(userIds));
    });

    // Listen global events ở đây nếu cần (e.g., notifications toàn app)
    // socketRef.current.on('globalNotification', (data) => { /* handle */ });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [accessToken, dispatch]);

  // Helper functions (giữ nguyên)
  const joinRoom = (roomId) => socketRef.current?.emit("joinRoom", roomId);
  const sendMessage = (data) => socketRef.current?.emit("sendMessage", data);
  const startTyping = (data) => socketRef.current?.emit("typing", data);

  return { socket: socketRef.current, joinRoom, sendMessage, startTyping };
};

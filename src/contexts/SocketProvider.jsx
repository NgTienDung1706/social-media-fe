// src/contexts/SocketProvider.jsx
import React from "react";
import { useSocket } from "@/hooks/useSocket"; // Import hook của bạn

// Wrapper component: Gọi useSocket bên trong (sẽ được wrap bởi Provider ở App)
const SocketProvider = ({ children }) => {
  // Gọi hook ở đây → Đã trong JSX tree, an toàn
  useSocket(); // Tự connect nếu có token từ Redux

  return <>{children}</>; // Render children (các component con)
};

export default SocketProvider;

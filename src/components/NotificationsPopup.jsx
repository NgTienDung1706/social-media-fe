import React, { useState, useEffect } from "react";

function NotificationsPopup({ open, onClose }) {
  // Dữ liệu giả lập, bạn có thể thay bằng API sau
  const notifications = [
    { id: 1, text: "Bạn có tin nhắn mới từ Tiến Dũng" },
    { id: 2, text: "Quang TX đã bình luận vào bài viết của bạn" },
    { id: 3, text: "Meta AI vừa cập nhật tính năng mới" },
  ];

  // Animation: giữ popup trong DOM khi đóng, sau 1s mới remove
  const [show, setShow] = useState(open);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (open) {
      setShow(true);
      setAnimating(true);
      setTimeout(() => setVisible(true), 10);
      const timer = setTimeout(() => setAnimating(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setAnimating(true);
      setVisible(false);
      const timer = setTimeout(() => {
        setShow(false);
        setAnimating(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [open]);
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className={`bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative transition-all duration-1000 transform
        ${visible ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-32 scale-95 opacity-0'}
        ${animating ? 'ease-in-out' : ''}
      `}>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-center text-brand-blue">Thông báo</h2>
        <ul className="divide-y divide-gray-200">
          {notifications.length === 0 ? (
            <li className="py-2 text-gray-500 text-center">Không có thông báo nào.</li>
          ) : (
            notifications.map(n => (
              <li key={n.id} className="py-2 text-gray-700">
                {n.text}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default NotificationsPopup;

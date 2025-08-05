import React, { useState, useEffect } from "react";

function CreatePopup({ open, onClose }) {
  const [content, setContent] = useState("");

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
        <h2 className="text-xl font-bold mb-4 text-center text-brand-blue">Tạo bài viết mới</h2>
        <textarea
          className="w-full border rounded-md p-2 mb-4"
          rows={4}
          placeholder="Nhập nội dung bài viết..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button
          className="w-full bg-brand-green hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
          onClick={() => { alert("Đã tạo bài viết: " + content); onClose(); }}
        >
          Đăng bài
        </button>
      </div>
    </div>
  );
}

export default CreatePopup;

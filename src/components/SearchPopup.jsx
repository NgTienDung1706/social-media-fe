import { useState, useEffect } from "react";

function SearchPopup({ open, onClose }) {
  const [query, setQuery] = useState("");
  // Kết quả giả lập, bạn có thể thay bằng API sau
  const results = query
    ? [
        { id: 1, name: "Nguyễn Tiến Dũng", type: "Người dùng" },
        { id: 2, name: "Bài viết: React UI", type: "Bài viết" },
      ]
    : [];

  // Animation: giữ popup trong DOM khi đóng, sau 1s mới remove
  const [show, setShow] = useState(open);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (open) {
      setShow(true);
      setAnimating(true);
      setTimeout(() => setVisible(true), 10); // Kích hoạt hiệu ứng xuất hiện
      const timer = setTimeout(() => setAnimating(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setAnimating(true);
      setVisible(false); // Kích hoạt hiệu ứng ẩn
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
      <div
        className={`bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative transition-all duration-1000 transform
          ${visible ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-32 scale-95 opacity-0'}
          ${animating ? 'ease-in-out' : ''}
        `}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-center text-brand-blue">Tìm kiếm</h2>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Nhập từ khoá..."
          className="w-full px-4 py-2 border rounded-md mb-4"
          autoFocus
        />
        <div>
          {results.length === 0 ? (
            <p className="text-gray-500 text-center">Nhập từ khoá để tìm kiếm...</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {results.map(item => (
                <li key={item.id} className="py-2 flex items-center gap-2">
                  <span className="font-semibold text-brand-blue">{item.name}</span>
                  <span className="text-xs text-gray-400">({item.type})</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPopup;

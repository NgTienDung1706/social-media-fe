function NotificationsPopup({ open, onClose }) {
  return (
    <div
      className={`fixed top-0 left-20 h-screen w-80 bg-white shadow-lg border-r border-gray-200 z-50
      transform transition-transform duration-300 ease-in-out
      ${open ? "translate-x-0" : "-translate-x-full pointer-events-none opacity-0"}`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Thông báo</h2>
        <button onClick={onClose}>Đóng</button>
      </div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="w-full border rounded-lg p-2 mb-4"
        />
        <div className="space-y-4">
          {/* Example notification items */}
          <div className="p-2 hover:bg-gray-100 rounded-lg transition">
            <p className="text-sm">Bạn có một thông báo mới!</p>
            <span className="text-xs text-gray-500">1 phút trước</span>
          </div>
          <div className="p-2 hover:bg-gray-100 rounded-lg transition">
            <p className="text-sm">Ai đó đã thích bài viết của bạn.</p>
            <span className="text-xs text-gray-500">5 phút trước</span>
          </div>
          {/* Add more notifications as needed */}
        </div>
        
      </div>
    </div>
  );
}

export default NotificationsPopup;

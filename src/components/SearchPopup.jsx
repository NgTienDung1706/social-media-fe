
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";
import { searchUsers } from '@/features/search/searchAPI';
import { useNavigate } from "react-router-dom";



function SearchPopup({ open, onClose, onOpenConfirmModal, reloadKey }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [users, setUsers] = useState([]); // <-- Danh sách kết quả
  //const [recentUsers, setRecentUsers] = useState([]);
  const [recentUsers, setRecentUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("recentSearches") || "[]");
  });
  const navigate = useNavigate();

  // Lấy lịch sử gần đây khi popup mở
  useEffect(() => {
    if (open) {
      setQuery("");
      setUsers([]);
      const stored = JSON.parse(localStorage.getItem("recentSearches") || "[]");
      setRecentUsers(stored);
    }
  }, [open, reloadKey]);

  // Lưu user vào lịch sử
  const saveRecentUser = (user) => {
    const recent = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    let updated;

    if (recent.find((u) => u._id === user._id)) {
      // Đưa user đã có lên đầu
      updated = [user, ...recent.filter((u) => u._id !== user._id)];
    } else {
      updated = [user, ...recent];
    }

    // Giới hạn tối đa 10 người
    if (updated.length > 10) updated = updated.slice(0, 10);

    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setRecentUsers(updated);
  };
  // Xóa toàn bộ lịch sử
  const clearAllHistory = () => {
    onOpenConfirmModal(); // Mở modal xác nhận từ AppSidebar
  };

  // Reset khi popup mở lại
  useEffect(() => {
    if (open) {
      setQuery("");
      setUsers([]);
    }
  }, [open]);

  // Gọi API search
  const handleSearch = async (text) => {
    setLoading(true);
    try {
      const res = await searchUsers(text);
      setUsers(res.users || []);
    } catch (err) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý debounce
  useEffect(() => {
    if (query.trim() === "") return;
    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      handleSearch(query);
    }, 500);

    setTypingTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [query]);

  // Xóa nội dung tìm kiếm
  const clearInput = () => {
    setQuery("");
    setUsers([]);
  };

  return (
    <div
      className={`fixed top-0 left-20 h-screen w-80 bg-white shadow-lg border-r border-gray-200 z-50
      transform transition-transform duration-300 ease-in-out
      ${open ? "translate-x-0" : "-translate-x-full pointer-events-none opacity-0"}`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Tìm kiếm</h2>
        <button onClick={onClose}>Đóng</button>
      </div>

      <div className="p-4 relative border-b">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded-lg p-2 pr-10 focus:outline-none"
        />

        {/* Icon hiển thị bên phải */}
        {query && (
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer">
            {loading ? (
              <ImSpinner2 className="animate-spin text-xl" />
            ) : (
              <AiOutlineClose className="text-xl" onClick={clearInput} />
            )}
          </div>
        )}
      </div>

      {/* Danh sách kết quả */}
      <div className="px-4">
         {/* Hiển thị kết quả tìm kiếm */}
        {query.trim() !== "" && (
          <>
            {users.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {users.map((user) => (
                  <li
                    key={user._id}
                    onClick={() => {
                      saveRecentUser(user);
                      navigate(`/profile/${user.username}`);
                     onClose(); // đóng popup sau khi điều hướng
                    }}
                    className="flex items-center py-2 gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <img
                      src={user.avatar || "/default-avatar.png"}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{user.username}</p>
                      <p className="text-xs text-gray-500">{user.fullName}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              !loading && (
                <p className="text-gray-500 text-sm text-center py-4">
                  Không tìm thấy người dùng
                </p>
              )
            )}
          </>
        )}

        {/* Hiển thị lịch sử gần đây */}
        {query.trim() === "" && recentUsers.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-1 px-1 py-2">
              <p className="text-xs text-black-400">Đã xem gần đây</p>
              <button
                className="text-xs text-brand-blue hover:underline"
                onClick={clearAllHistory}
              >
                Xóa tất cả
              </button>
            </div>
            <ul className="divide-y divide-gray-200">
              {recentUsers.map((user) => (
                <li
                  key={user._id}
                  onClick={() => {
                      saveRecentUser(user);
                      navigate(`/profile/${user.username}`);
                     onClose(); // đóng popup sau khi điều hướng
                    }}
                  className="flex items-center py-2 gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt={user.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{user.username}</p>
                    <p className="text-xs text-gray-500">{user.fullName}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Modal xác nhận */}
      {/* <ConfirmModal
        open={showConfirm}
        title="Xác nhận"
        message="Bạn có chắc muốn xóa toàn bộ lịch sử tìm kiếm?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={clearAllHistory}
      /> */}
    </div>
  );
}

export default SearchPopup;

import React, { useState, useRef, useEffect } from "react";
import ConversationItem from "@/features/message/components/ConversationItem";
import { getConversations } from "@/features/message/messageApi";
//import { ChevronDownIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

// Mock data cho ghi chú của bạn bè (tương tự MOCK_CONVERSATIONS, nhưng phù hợp horizontal)
const MOCK_FRIENDS_NOTES = [
  {
    id: "n1",
    name: "Trần Xuân Quang",
    avatar: "https://i.pravatar.cc/80?img=12",
    note: "Nhớ🎵",
    time: "2 giờ trước",
    isOwn: false,
  },
  {
    id: "n2",
    name: "Thùy Tiên",
    avatar: "https://i.pravatar.cc/80?img=5",
    note: "Cuối tuần rồi, plan đi cafe với bạn bè thôi! ☕",
    time: "5 giờ trước",
    isOwn: false,
  },
  {
    id: "n3",
    name: "Nguyễn Xuân Đạt",
    avatar: "https://i.pravatar.cc/80?img=15",
    note: "Hoàn thành project 🚀",
    time: "21 phút trước",
    isOwn: false,
  },
  {
    id: "n4",
    name: "Thế Dũng",
    avatar: "https://i.pravatar.cc/80?img=8",
    note: "Nabsnkzkshsnskkskskskmsndbhsjamsmsmsmsnnsmsmsnn",
    time: "11 giờ trước",
    isOwn: false,
  },
  {
    id: "n5",
    name: "Nguyễn Lê Yến Nhi",
    avatar: "https://i.pravatar.cc/80?img=20",
    note: "Thích quá, hoa anh đào nở đẹp lung linh! 🌸",
    time: "1 ngày trước",
    isOwn: false,
  },
];

function MessagesSidebar({ onSelectConversation, activeId }) {
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]); // State cho conversations
  const [noteItems] = useState(MOCK_FRIENDS_NOTES); // State cho notes (không cần search riêng)
  //const debRef = useRef(null);
  const notesScrollRef = useRef(null); // Ref cho notes scroll container
  const me = useSelector((state) => state.auth.login.currentUser);

  // debounce search cho conversations
  // useEffect(() => {
  //   if (debRef.current) clearTimeout(debRef.current);
  //   debRef.current = setTimeout(() => {
  //     const v = q.trim().toLowerCase();
  //     if (!v) {
  //       setItems(MOCK_CONVERSATIONS);
  //     } else {
  //       setItems(
  //         MOCK_CONVERSATIONS.filter((i) => i.name.toLowerCase().includes(v))
  //       );
  //     }
  //   }, 250);
  //   return () => clearTimeout(debRef.current);
  // }, [q]);
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const conversations = await getConversations();
        setItems(conversations);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  // Hỗ trợ scroll ngang bằng chuột wheel
  useEffect(() => {
    const scrollContainer = notesScrollRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e) => {
      // Nếu đang scroll theo chiều dọc thì bỏ qua
      if (e.deltaY === 0) return;

      // Ngăn scroll dọc và scroll ngang thay thế
      e.preventDefault();
      scrollContainer.scrollLeft += e.deltaY;
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    return () => scrollContainer.removeEventListener("wheel", handleWheel);
  }, []);

  // Hàm render item cho notes (horizontal: text bubble trên, avatar dưới)
  const NoteItem = ({ item, onClick }) => (
    <div
      className="flex flex-col relative items-center w-24 h-full pt-8 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors flex-shrink-0"
      onClick={() => onClick && onClick(item)}
    >
      <div className="relative flex-shrink-0">
        <img
          src={item.avatar}
          alt={item.name}
          className="w-[74px] h-[74px] rounded-full object-cover" // SỬA: Avatar nhỏ hơn cho compact
        />
      </div>

      <div className="absolute top-0 left-2 min-h-[42px] max-w-full text-center bg-white border border-gray-100 rounded-xl shadow-lg px-3 py-1 inline-flex items-center justify-center">
        <span
          className="text-xs text-black-500 leading-tight overflow-hidden min-h-auto break-words"
          style={{
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            display: "-webkit-box",
          }}
        >
          {item.note}
        </span>

        <div className="absolute -bottom-[6px] left-2 w-3 h-3 bg-white rounded-full border-2 border-white">
          <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-white rounded-full"></div>
        </div>
      </div>
      {/* Tên và time ở dưới avatar */}
      <div className="text-center">
        <span className="text-xs font-medium text-gray-800 truncate block">
          {item.name}
        </span>
      </div>
    </div>
  );

  return (
    <div
      className="h-screen border-r border-gray-200 flex flex-col bg-white"
      style={{ width: "var(--sidebar-w)" }}
    >
      {/* Header với tên user và icon compose */}
      <div className="pt-9 px-6 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">{me?.username}</h1>
          {/* <ChevronDownIcon className="w-4 h-4 text-gray-500" /> */}
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <FaPlus className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Thanh tìm kiếm cho toàn bộ */}
      <div className="px-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm kiếm tin nhắn"
          className="w-full px-4 py-2 rounded-full bg-gray-100 text-md focus:outline-none focus:bg-gray-200 transition-colors"
        />
      </div>

      {/* Phần Ghi chú của bạn bè (horizontal scroll, ẩn scrollbar, hỗ trợ swipe) */}
      <div className="px-4 pt-5">
        <div
          ref={notesScrollRef}
          className="flex overflow-x-scroll space-x-3 pb-2 scrollbar-hide"
          style={{
            overflowX: "scroll",
            WebkitOverflowScrolling: "touch",
            scrollBehavior: "smooth",
          }}
        >
          <div
            className="flex flex-col relative items-center w-24 h-full pt-8 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors flex-shrink-0"
            onClick={() => console.log("View your note")}
          >
            <div className="relative flex-shrink-0">
              <img
                src={me?.profile?.avatar || "https://i.pravatar.cc/80?img=1"}
                alt=""
                className="w-[74px] h-[74px] rounded-full object-cover" // SỬA: Avatar nhỏ hơn cho compact
              />
            </div>

            <div className="absolute top-0 left-2 min-h-[42px] max-w-full text-center bg-white border border-gray-100 rounded-xl shadow-lg px-3 py-1 inline-flex items-center justify-center">
              <span
                className="text-xs text-gray-400 leading-tight overflow-hidden min-h-auto break-words"
                style={{
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  display: "-webkit-box",
                }}
              >
                Ghi chú...
              </span>

              <div className="absolute -bottom-[6px] left-2 w-3 h-3 bg-white rounded-full border-2 border-white">
                <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
            {/* Tên và time ở dưới avatar */}
            <div className="text-center">
              <span className="text-xs font-medium text-gray-400 truncate block">
                Ghi chú của bạn
              </span>
            </div>
          </div>

          {noteItems.map((item) => (
            <NoteItem
              key={item.id}
              item={item}
              onClick={() => console.log("View note:", item.note)}
            />
          ))}
        </div>
      </div>

      {/* Tab Tin nhắn */}
      <div className="px-6 py-2">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-bold text-black">Tin nhắn</h3>
          <button className="text-md text-gray-500 hover:text-blue-600 font-medium transition-colors">
            Tin nhắn đang chờ
          </button>
        </div>
      </div>

      {/* Danh sách tin nhắn - "Your Note" là item đầu tiên */}
      <div className="flex-1 overflow-auto space-y-1">
        {/* Các conversation items còn lại */}
        {items.map((item) => (
          <ConversationItem
            key={item._id}
            item={item}
            onClick={onSelectConversation}
            active={activeId === item._id}
          />
        ))}
      </div>
    </div>
  );
}

export default MessagesSidebar;

import {
  FaHome,
  FaSearch,
  FaCompass,
  FaFacebookMessenger,
  FaHeart,
  FaPlusSquare,
  FaUser,
} from "react-icons/fa";
import logo from "@/assets/Cham_bochu.png";
import logo2 from "@/assets/logo_cham.png";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchPopup from "@/components/popups/SearchPopup";
import NotificationsPopup from "@/components/popups/NotificationsPopup";
import CreatePopup from "@/components/popups/CreatePopup";
import ConfirmModal from "./ConfirmModal";

function AppSidebar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [lastRouteItem, setLastRouteItem] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const isPopupOpen = searchOpen || notificationsOpen;
  const currentUser = useSelector(
    (state) => state.auth.login?.currentUser?.username || ""
  );

  const [confirmData, setConfirmData] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  // Mở modal với dữ liệu tùy biến
  const openConfirm = (title, message, onConfirm) => {
    setConfirmData({
      open: true,
      title,
      message,
      onConfirm,
    });
  };

  const closeConfirm = () => {
    setConfirmData((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (!searchOpen && !notificationsOpen) {
      if (location.pathname.startsWith("/home")) setActiveItem("home");
      else if (location.pathname.startsWith("/messenger"))
        setActiveItem("messenger");
      else if (location.pathname.startsWith("/explore"))
        setActiveItem("explore");
      else if (
        location.pathname === "/profile" ||
        location.pathname === `/profile/${currentUser}`
      ) {
        setActiveItem("profile");
      } else setActiveItem("");
      setLastRouteItem(activeItem);
    }
  }, [location.pathname, searchOpen, notificationsOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && searchOpen) {
        setSearchOpen(false);
        setActiveItem(lastRouteItem);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [searchOpen, lastRouteItem]);

  // Hàm để đóng tất cả popup
  const closeAllPopups = () => {
    setSearchOpen(false);
    setNotificationsOpen(false);
    setCreateOpen(false);
  };

  // Hàm để điều hướng và cập nhật activeItem
  const handleNavigate = (key, path) => {
    closeAllPopups();
    setActiveItem(key);
    navigate(path);
  };

  const handleOpenSearch = () => {
    if (searchOpen) {
      // Nếu đang mở thì đóng lại
      setSearchOpen(false);
      setActiveItem(lastRouteItem);
    } else {
      // Nếu đang đóng thì mở popup
      closeAllPopups(); // Đóng tất cả popup khác nếu có
      setLastRouteItem(activeItem);
      setActiveItem("search");
      setSearchOpen(true);
    }
  };
  const handleCloseSearch = () => {
    setSearchOpen(false);
    setActiveItem(lastRouteItem);
  };
  const handleOpenNotifications = () => {
    if (notificationsOpen) {
      // Nếu đang mở thì đóng lại
      setNotificationsOpen(false);
      setActiveItem(lastRouteItem);
    } else {
      closeAllPopups(); // Đóng tất cả popup khác nếu có
      // Nếu đang đóng thì mở popup
      setLastRouteItem(activeItem);
      setActiveItem("notifications");
      setNotificationsOpen(true);
    }
  };
  const handleCloseNotifications = () => {
    setNotificationsOpen(false);
    setActiveItem(lastRouteItem);
  };
  const handleOpenCreate = () => {
    setLastRouteItem(activeItem);
    setActiveItem("create");
    setCreateOpen(true);
  };
  const handleCloseCreate = () => {
    setCreateOpen(false);
    setActiveItem(lastRouteItem);
  };
  const itemClass = (key) =>
    `flex items-center ${
      searchOpen ? "gap-0" : "gap-4"
    } px-4 py-2 rounded-lg w-full text-left transition-colors duration-150 ` +
    (activeItem === key
      ? "bg-gray-200 text-brand-green font-bold border-l-4 border-brand-green"
      : "hover:bg-gray-100 text-gray-700");
  return (
    <>
      {/* Sidebar trái – hiện khi màn hình >= sm */}
      <nav
        className={`hidden md:flex flex-col gap-2 fixed top-0 left-0 h-screen 
        bg-white border-r border-gray-200 py-4 px-2 z-40 
        transition-all duration-300 
        w-16 md:w-20 xl:w-20`}
      >
        <div
          className={`mb-6 py-3 flex items-center justify-center cursor-pointer h-20 
        ${
          isPopupOpen ? "px-0 w-16" : "px-4 w-full"
        } transition-all duration-300`}
          onClick={() => handleNavigate("home", "/home")}
        >
          {/* Logo nhỏ */}
          <span
            className={`font-logo text-3xl items-center justify-center 
          w-auto max-w-fit shrink-0`}
          >
            <img src={logo} alt="CHẠM" className="w-10 h-auto" />
          </span>
        </div>

        <button
          type="button"
          className={itemClass("home")}
          onClick={() => handleNavigate("home", "/home")}
        >
          <FaHome className="text-2xl" />
        </button>
        <button
          type="button"
          onClick={handleOpenSearch}
          className={itemClass("search")}
        >
          <FaSearch className="text-2xl" />
        </button>
        <button
          type="button"
          className={itemClass("explore")}
          onClick={() => handleNavigate("explore", "/explore")}
        >
          <FaCompass className="text-2xl" />
        </button>
        <button
          type="button"
          className={itemClass("messenger")}
          onClick={() => handleNavigate("messenger", "/messenger")}
        >
          <FaFacebookMessenger className="text-2xl" />
        </button>
        <button
          type="button"
          className={itemClass("notifications")}
          onClick={handleOpenNotifications}
        >
          <FaHeart className="text-2xl" />
        </button>
        <button
          type="button"
          className={itemClass("create")}
          onClick={handleOpenCreate}
        >
          <FaPlusSquare className="text-2xl" />
        </button>
        <button
          type="button"
          className={itemClass("profile")}
          onClick={() => handleNavigate("profile", "/profile")}
        >
          <FaUser className="text-2xl" />
        </button>
        {/* <button
          type="button"
          className={itemClass("metaai")}
          onClick={() => setActiveItem("metaai")}
        >
          <FaRobot className="text-2xl" />
          <span
            className={`transition-all duration-300 ${
              isPopupOpen ? "hidden" : "hidden xl:inline"
            }`}
          >
            Meta AI
          </span>
        </button>
        <button
          type="button"
          className={itemClass("aistudio")}
          onClick={() => setActiveItem("aistudio")}
        >
          <FaCogs className="text-2xl" />
          <span
            className={`transition-all duration-300 ${
              isPopupOpen ? "hidden" : "hidden xl:inline"
            }`}
          >
            AI Studio
          </span>
        </button> */}
      </nav>

      {/* Popup tìm kiếm */}
      <SearchPopup
        open={searchOpen}
        onClose={handleCloseSearch}
        onOpenConfirmModal={() =>
          openConfirm(
            "Xóa tất cả",
            "Bạn có chắc chắn muốn xóa toàn bộ lịch sử tìm kiếm gần đây?",
            () => {
              localStorage.removeItem("recentSearches");
              setReloadKey((prev) => prev + 1);
              closeConfirm();
            }
          )
        }
        reloadKey={reloadKey}
      />
      {/* Modal dùng chung */}
      <ConfirmModal
        open={confirmData.open}
        title={confirmData.title}
        message={confirmData.message}
        onCancel={closeConfirm}
        onConfirm={confirmData.onConfirm}
      />
      {/* Popup thông báo */}
      <NotificationsPopup
        open={notificationsOpen}
        onClose={handleCloseNotifications}
      />
      {/* Popup tạo */}
      <CreatePopup open={createOpen} onClose={handleCloseCreate} />

      {/* Sidebar dưới – chỉ hiện khi < sm */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-14 z-50">
        <a href="/home">
          <FaHome className="text-xl text-gray-700" />
        </a>
        <a href="/explore">
          <FaCompass className="text-xl text-gray-700" />
        </a>
        <a href="">
          <FaPlusSquare className="text-xl text-gray-700" />
        </a>
        <a href="/messenger">
          <FaFacebookMessenger className="text-xl text-gray-700" />
        </a>
        <a href="/profile">
          <FaUser className="text-xl text-gray-700" />
        </a>
      </nav>
    </>
  );
}

export default AppSidebar;

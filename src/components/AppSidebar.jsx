import { FaHome, FaSearch, FaCompass, FaVideo, FaFacebookMessenger, FaHeart, FaPlusSquare, FaUser, FaRobot, FaCogs } from "react-icons/fa";
import logo from "@/assets/Cham_bochu.png";
import logo2 from "@/assets/logo_cham.png";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchPopup from "./SearchPopup";
import NotificationsPopup from "./NotificationsPopup";
import CreatePopup from "./CreatePopup";

function AppSidebar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [lastRouteItem, setLastRouteItem] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!searchOpen && !notificationsOpen) {
      if (location.pathname.startsWith("/home")) setActiveItem("home");
      else if (location.pathname.startsWith("/messenger")) setActiveItem("messenger");
      else if (location.pathname.startsWith("/explore")) setActiveItem("explore");
      else if (location.pathname.startsWith("/profile")) setActiveItem("profile");
      else setActiveItem("");
      setLastRouteItem(activeItem);
    }
  }, [location.pathname, searchOpen, notificationsOpen]);
  const handleOpenSearch = () => {
    setLastRouteItem(activeItem);
    setActiveItem("search");
    setSearchOpen(true);
  };
  const handleCloseSearch = () => {
    setSearchOpen(false);
    setActiveItem(lastRouteItem);
  };
  const handleOpenNotifications = () => {
    setLastRouteItem(activeItem);
    setActiveItem("notifications");
    setNotificationsOpen(true);
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
    `flex items-center gap-4 px-4 py-2 rounded-lg w-full text-left transition-colors duration-150 ` +
    (activeItem === key
      ? "bg-gray-200 text-blue-600 font-bold border-l-4 border-blue-500"
      : "hover:bg-gray-100 text-gray-700");
  return (
    <>
      {/* Sidebar trái – hiện khi màn hình >= sm */}
      <nav className="hidden md:flex flex-col gap-2 fixed top-0 left-0 h-screen w-16 md:w-20 xl:w-64 bg-white border-r border-gray-200 flex flex-col py-4 px-2 z-40">
      <div className="mb-6 px-4 py-3">
        <span className="font-logo text-3xl hidden xl:inline">
          <img src={logo2} alt="CHẠM" className="w-20 h-auto mx-auto" />
        </span>
        <span className="font-logo text-3xl xl:hidden flex items-center justify-center">
          <img src={logo} alt="CHẠM" className="w-20 h-auto mx-auto" />

        </span>
      </div>
      <button type="button" className={itemClass("home")} onClick={() => { setActiveItem("home"), navigate("/home");}}> 
        <FaHome className="text-2xl" />
        <span className="hidden xl:inline">Trang chủ</span>
      </button>
      <button type="button" onClick={handleOpenSearch} className={itemClass("search")}> 
        <FaSearch className="text-2xl" />
        <span className="hidden xl:inline">Tìm kiếm</span>
      </button>
      <button type="button" className={itemClass("explore")} onClick={() => { setActiveItem("explore") , navigate("/explore");}}> 
        <FaCompass className="text-2xl" />
        <span className="hidden xl:inline">Khám phá</span>
      </button>
      <button type="button" className={itemClass("messenger")} onClick={() => { setActiveItem("messenger"); navigate("/messenger"); }}> 
        <FaFacebookMessenger className="text-2xl" />
        <span className="hidden xl:inline">Tin nhắn</span>
      </button>
      <button type="button" className={itemClass("notifications")} onClick={handleOpenNotifications}> 
        <FaHeart className="text-2xl" />
        <span className="hidden xl:inline">Thông báo</span>
      </button>
      <button type="button" className={itemClass("create")} onClick={handleOpenCreate}> 
        <FaPlusSquare className="text-2xl" />
        <span className="hidden xl:inline">Tạo</span>
      </button>
      <button type="button" className={itemClass("profile")} onClick={() => {setActiveItem("profile"), navigate("/profile");} }> 
        <FaUser className="text-2xl" />
        <span className="hidden xl:inline">Trang cá nhân</span>
      </button>
      <button type="button" className={itemClass("metaai")} onClick={() => setActiveItem("metaai")}> 
        <FaRobot className="text-2xl" />
        <span className="hidden xl:inline">Meta AI</span>
      </button>
      <button type="button" className={itemClass("aistudio")} onClick={() => setActiveItem("aistudio")}> 
        <FaCogs className="text-2xl" />
        <span className="hidden xl:inline">AI Studio</span>
      </button>
    </nav>

    {/* Popup tìm kiếm */}
      <SearchPopup open={searchOpen} onClose={handleCloseSearch} />
    {/* Popup thông báo */}
      <NotificationsPopup open={notificationsOpen} onClose={handleCloseNotifications} />
    {/* Popup tạo */}
      <CreatePopup open={createOpen} onClose={handleCloseCreate} />

      {/* Sidebar dưới – chỉ hiện khi < sm */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-14 z-50">
        <a href="#"><FaHome className="text-xl text-gray-700" /></a>
        <a href="#"><FaCompass className="text-xl text-gray-700" /></a>
        <a href="#"><FaPlusSquare className="text-xl text-gray-700" /></a>
        <a href="#"><FaFacebookMessenger className="text-xl text-gray-700" /></a>
        <a href="#"><FaUser className="text-xl text-gray-700" /></a>
      </nav>
    </>
  );
}

export default AppSidebar;

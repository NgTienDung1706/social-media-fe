import { FaHome, FaSearch, FaCompass, FaVideo, FaFacebookMessenger, FaHeart, FaPlusSquare, FaUser, FaRobot, FaCogs } from "react-icons/fa";

function AppSidebar() {
  return (
    <nav className="flex flex-col gap-2 w-full">
      <div className="mb-6 px-4">
        <span className="font-logo text-3xl hidden md:inline">TienDung</span>
        <span className="font-logo text-3xl md:hidden flex items-center justify-center"><FaHome /></span>
      </div>
      <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 font-semibold text-gray-900">
        <FaHome className="text-2xl" />
        <span className="hidden md:inline">Trang chủ</span>
      </a>
      <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
        <FaSearch className="text-2xl" />
        <span className="hidden md:inline">Tìm kiếm</span>
      </a>
      <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
        <FaCompass className="text-2xl" />
        <span className="hidden md:inline">Khám phá</span>
      </a>
      {/* <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
        <FaVideo className="text-2xl" />
        <span className="hidden md:inline">Reels</span>
      </a> */}
      <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
        <FaFacebookMessenger className="text-2xl" />
        <span className="hidden md:inline">Tin nhắn</span>
      </a>
      <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
        <FaHeart className="text-2xl" />
        <span className="hidden md:inline">Thông báo</span>
      </a>
      <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
        <FaPlusSquare className="text-2xl" />
        <span className="hidden md:inline">Tạo</span>
      </a>
      <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
        <FaUser className="text-2xl" />
        <span className="hidden md:inline">Trang cá nhân</span>
      </a>
      <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
        <FaRobot className="text-2xl" />
        <span className="hidden md:inline">Meta AI</span>
      </a>
      <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
        <FaCogs className="text-2xl" />
        <span className="hidden md:inline">AI Studio</span>
      </a>
      {/* <div className="flex-1" />
      <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 mb-2">
        <span className="relative">
          <FaFacebookMessenger className="text-2xl" />
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">9+</span>
        </span>
        <span className="hidden md:inline">Threads</span>
      </a> */}
    </nav>
  );
}

export default AppSidebar;

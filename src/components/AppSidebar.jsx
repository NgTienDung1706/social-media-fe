import { FaHome, FaSearch, FaCompass, FaVideo, FaFacebookMessenger, FaHeart, FaPlusSquare, FaUser, FaRobot, FaCogs } from "react-icons/fa";
import logo from "@/assets/Cham_bochu.png";
import logo2 from "@/assets/logo_cham.png";

function AppSidebar() {
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
      <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 font-semibold text-gray-900">
        <FaHome className="text-2xl" />
        <span className="hidden xl:inline">Trang chủ</span>
      </a>
      <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
        <FaSearch className="text-2xl" />
        <span className="hidden xl:inline">Tìm kiếm</span>
      </a>
      <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
        <FaCompass className="text-2xl" />
        <span className="hidden xl:inline">Khám phá</span>
      </a>
      <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
        <FaFacebookMessenger className="text-2xl" />
        <span className="hidden xl:inline">Tin nhắn</span>
      </a>
      <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
        <FaHeart className="text-2xl" />
        <span className="hidden xl:inline">Thông báo</span>
      </a>
      <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
        <FaPlusSquare className="text-2xl" />
        <span className="hidden xl:inline">Tạo</span>
      </a>
      <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
        <FaUser className="text-2xl" />
        <span className="hidden xl:inline">Trang cá nhân</span>
      </a>
      <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
        <FaRobot className="text-2xl" />
        <span className="hidden xl:inline">Meta AI</span>
      </a>
      <a href="#" className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
        <FaCogs className="text-2xl" />
        <span className="hidden xl:inline">AI Studio</span>
      </a>
    </nav>

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

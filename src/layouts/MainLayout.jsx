import { Outlet } from "react-router-dom";

function MainLayout({ sidebar, rightbar, children, maxWidth }) {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Sidebar */}
      <aside className="">{sidebar}</aside>

      {/* Header chỉ hiển thị trên mobile */}
      <header className="flex items-center justify-between px-4 py-2 bg-white fixed top-0 left-0 right-0 z-50 shadow md:hidden">
        <span className="text-lg font-semibold">Trang chủ</span>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="ml-2 px-3 py-1.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </header>

      {/* Nội dung chính */}
      <div className="pl-0 md:pl-20 xl:pl-64 max-md:mt-9">
        <div className="flex flex-row min-h-screen">
          <main className="flex-1 flex flex-col items-center px-2 sm:px-4 pt-6 pb-20 md:pb-12 bg-white min-h-screen w-full">
            <div className={`w-full flex-1 ${maxWidth ? "max-w-2xl" : ""}`}>
              {/* Nếu có children (Home), render children. Nếu không, render Outlet (Messenger, Explore, Profile) */}
              {children ? children : <Outlet />}
              {/* UserStatusCard – cố định dưới cùng */}
            </div>
          </main>
          {/* Rightbar – chỉ hiển thị trên màn hình lớn */}
          {rightbar && (
            <aside className="hidden xl:block w-[300px] px-4 pt-8 pb-4 bg-transparent flex-shrink-0">
              {rightbar}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;

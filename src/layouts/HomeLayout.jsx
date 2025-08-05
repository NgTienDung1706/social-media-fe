import UserStatusCard from "../components/UserStatusCard";

function MainLayout({ children, sidebar, rightbar }) {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden relative">
      {/* Sidebar */}
      <aside className="">
        {sidebar}
      </aside>

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
          <main className="flex-1 flex flex-col items-center px-2 sm:px-4 pt-6 pb-20 md:pb-12 bg-[#fafafa] min-h-screen w-full">
            <div className="w-full max-w-2xl flex-1">
              {children}
              

              {/* UserStatusCard – cố định dưới cùng */}
              <div className="relative w-full max-w-full">
                <div className="hidden md:flex fixed bottom-0 left-0 right-0 w-full max-w-full sm:max-w-md mx-auto justify-center md:bottom-4 md:left-auto md:right-4 md:justify-end z-50 px-2 pb-2 md:px-0 md:pb-0">
                  <UserStatusCard className="max-w-full" />
                </div>
              </div>
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

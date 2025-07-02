import UserStatusCard from "../components/UserStatusCard";

function MainLayout({ children, sidebar, rightbar }) {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden relative">
      {/* Sidebar cố định bên trái */}
      <aside className="fixed top-0 left-0 h-screen w-16 sm:w-20 md:w-64 bg-white border-r border-gray-200 flex flex-col py-4 px-2 z-40">
        {sidebar}
      </aside>

      {/* Nội dung chính */}
      <div className="pl-16 sm:pl-20 md:pl-64">
        <div className="flex flex-row min-h-screen">
          <main className="flex-1 flex flex-col items-center px-2 sm:px-4 pt-6 pb-20 bg-[#fafafa] min-h-screen w-full">
            <div className="w-full max-w-2xl flex-1">
              {children}

              {/* Khoảng trắng để UserStatusCard không che nội dung */}
              <div className="h-[10px] md:h-0" />

              {/* UserStatusCard – cố định dưới cùng */}
              <div className="relative w-full max-w-full">
                <div className="fixed bottom-0 left-0 right-0 w-full max-w-full sm:max-w-md mx-auto flex justify-center md:bottom-4 md:left-auto md:right-4 md:justify-end z-50 px-2 pb-2 md:px-0 md:pb-0">
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

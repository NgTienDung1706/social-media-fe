function RightSidebar() {
  return (
    <div className="w-full">
      {/* Profile section */}
      <div className="flex items-center gap-3 mb-6">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-12 h-12 rounded-full" alt="avatar" />
        <div>
          <div className="font-semibold text-gray-900 leading-tight">ttien.dung176</div>
          <div className="text-xs text-gray-500">Tiến Dũng</div>
          <a href="#" className="text-xs text-blue-500 font-semibold">Chuyển</a>
        </div>
      </div>
      {/* Gợi ý cho bạn */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-500 font-semibold text-sm">Gợi ý cho bạn</span>
        <a href="#" className="text-xs text-gray-700 font-semibold">Xem tất cả</a>
      </div>
      <div className="flex flex-col gap-3 mb-6">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="flex items-center gap-3">
            <img src={`https://randomuser.me/api/portraits/women/${30+i}.jpg`} className="w-8 h-8 rounded-full" alt="avatar" />
            <div className="flex-1">
              <div className="text-xs font-semibold text-gray-900">user{i}</div>
              <div className="text-xs text-gray-500">Gợi ý cho bạn</div>
            </div>
            <a href="#" className="text-xs text-blue-500 font-semibold">Theo dõi</a>
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="text-xs text-gray-400 mt-8">
        Giới thiệu • Trợ giúp • Báo chí • API • Việc làm<br />
        Quyền riêng tư • Điều khoản • Vị trí • Ngôn ngữ<br />
        © 2025 INSTAGRAM FROM META
      </div>
    </div>
  );
}

export default RightSidebar;

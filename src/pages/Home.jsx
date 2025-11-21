import HomeContent from "@/features/home/components/HomeContent";

function Home() {
  return (
    <>
      <header className="flex items-center justify-between px-4 py-2 bg-white fixed top-0 left-0 right-0 z-50 shadow md:hidden">
        <span className="text-lg font-semibold">Trang chủ</span>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="ml-2 px-3 py-1.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </header>
      <HomeContent />
    </>
  );
}

export default Home;

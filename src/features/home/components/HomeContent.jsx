import StoryList from "./StoryList";
import PostList from '@/features/posts/components/PostList'

function HomeContent() {
  return (
    <div className="w-full max-w-full overflow-x-hidden px-2 sm:px-0">
      {/* Header */}
      {/* <div className="w-full max-w-2xl sticky top-0 z-30 bg-white mb-6">
        <div className="flex items-center justify-between w-full">
          <span className="text-xl font-semibold text-gray-900">Trang chủ</span>

          <div className="block md:hidden">
            <input type="text" 
              placeholder="Tìm kiếm..."
              className="ml-2 px-3 py-1.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        </div>
      </div> */}

      {/* Stories */}
      <StoryList />

      {/* Bài viết */}
      <PostList />
    </div>
  );
}

export default HomeContent;

import StoryList from "./StoryList";
import PostList from '@/features/posts/components/PostList'

function HomeContent() {
  return (
    <div className="w-full max-w-full overflow-x-hidden px-2 sm:px-0">
      {/* Header */}
      <div className="w-full max-w-2xl mb-6">
        <div className="flex items-center justify-between w-full">
          <span className="text-xl font-semibold text-gray-900">Trang chủ</span>
        </div>
      </div>

      {/* Stories */}
      <StoryList />

      {/* Bài viết */}
      <PostList />
    </div>
  );
}

export default HomeContent;

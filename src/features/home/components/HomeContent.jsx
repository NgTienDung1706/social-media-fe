import StoryList from "./StoryList";
import PostList from "@/features/posts/components/PostList";

function HomeContent() {
  return (
    <div className="w-full max-w-2xl overflow-x-hidden px-2 sm:px-0">
      {/* Stories */}
      <StoryList />

      {/* Bài viết */}
      <PostList />
    </div>
  );
}

export default HomeContent;

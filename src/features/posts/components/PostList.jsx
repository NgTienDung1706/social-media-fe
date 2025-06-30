// src/features/home/components/PostList.jsx
import PostItem from "./PostItem";

const fakePosts = [1, 2, 3]; // Dữ liệu giả

function PostList() {
  return (
    <div className="flex flex-col gap-8 mt-6">
      {fakePosts.map((id) => (
        <PostItem key={id} />
      ))}
    </div>
  );
}

export default PostList;

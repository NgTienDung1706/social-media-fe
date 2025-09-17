import useUserPosts from "@/features/posts/hooks/useUserPosts";
import PostItem from "@/features/posts/components/PostItem";

function UserPostList({ username }) {
  const { posts, loading, error, hasMore, lastPostRef } =
    useUserPosts(username);

  return (
    <div className="flex flex-col gap-8 mt-6 w-full">
      {posts.length > 0 &&
        posts.map((post, index) => {
          if (index === posts.length - 1) {
            return (
              <div ref={lastPostRef} key={post._id}>
                <PostItem {...post} />
              </div>
            );
          } else {
            return <PostItem key={post._id} {...post} />;
          }
        })}

      {loading && <div className="text-gray-500 text-center">Đang tải...</div>}
      {!hasMore && !loading && (
        <div className="text-gray-500 text-center">Hết bài viết.</div>
      )}
      {error && <div className="text-red-500 text-center">{error}</div>}
    </div>
  );
}

export default UserPostList;

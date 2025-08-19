import { useEffect, useState, useRef, useCallback } from "react";
import { getUserPosts } from "../postAPI";
import PostItem from "./PostItem";

function UserPostList({ username }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetFlag, setResetFlag] = useState(false);

  const observer = useRef();

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Khi username đổi, reset state và set resetFlag để chỉ gọi API 1 lần cho page=1
  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
    setError("");
    setResetFlag(true);
  }, [username]);

  useEffect(() => {
    if (!hasMore) return;

    const fetchPosts = async () => {
      try {
        setLoading(true);

        if (resetFlag) {
          // Lấy trang đầu tiên khi đổi username
          const data = await getUserPosts(username, 1, 3);
          //console.log("API page 1:", data);
          setPosts(Array.isArray(data.posts) ? data.posts : []);
          setHasMore(data.hasMore);
          setResetFlag(false);
          return; // Ngăn gọi tiếp page 1 lần nữa
        }

        if (page > 1) {
          // Lazy load trang tiếp theo
          const data = await getUserPosts(username, page, 3);
          //console.log(`API page ${page}:`, data);
          setPosts((prev) => [
            ...prev,
            ...(Array.isArray(data.posts) ? data.posts : []),
          ]);
          setHasMore(data.hasMore);
        }
      } catch (err) {
        console.error("Lỗi API:", err);
        setError(err?.message || "Lỗi tải bài viết");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [username, page, hasMore, resetFlag]);
//   useEffect(() => {
//   if (!hasMore) return;
//   if (resetFlag) {
//     setLoading(true);
//     getUserPosts(username, 1, 3)
//       .then((data) => {
//         console.log("Dữ liệu API trả về:", data);
//         setPosts(Array.isArray(data.posts) ? data.posts : []);
//         setHasMore(data.hasMore);
//       })
//       .catch((err) => {
//         console.error("Lỗi API:", err);
//         setError(err?.message || "Lỗi tải bài viết");
//       })
//       .finally(() => {
//         setLoading(false);
//         setResetFlag(false);
//       });
//     return;
//   }
//   if (page > 1) {
//     setLoading(true);
//     console.log("Gọi API cho username:", username, "page:", page);
//     getUserPosts(username, page, 3)
//       .then((data) => {
//         console.log("Dữ liệu API trả về:", data);
//         setPosts((prev) => [...prev, ...(Array.isArray(data.posts) ? data.posts : [])]);
//         setHasMore(data.hasMore);
//       })
//       .catch((err) => {
//         console.error("Lỗi API:", err);
//         setError(err?.message || "Lỗi tải bài viết");
//       })
//       .finally(() => setLoading(false));
//   }
// }, [username, page, hasMore, resetFlag]);

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

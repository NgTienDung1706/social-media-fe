import { useEffect, useState, useRef, useCallback } from "react";
import { getUserPosts } from "../postAPI";

export default function useUserPosts(username) {
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
          const data = await getUserPosts(username, 1, 3);
          setPosts(Array.isArray(data.posts) ? data.posts : []);
          setHasMore(data.hasMore);
          setResetFlag(false);
          return;
        }
        if (page > 1) {
          const data = await getUserPosts(username, page, 3);
          setPosts((prev) => [
            ...prev,
            ...(Array.isArray(data.posts) ? data.posts : []),
          ]);
          setHasMore(data.hasMore);
        }
      } catch (err) {
        setError(err?.message || "Lỗi tải bài viết");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [username, page, hasMore, resetFlag]);

  return { posts, loading, error, hasMore, lastPostRef };
}

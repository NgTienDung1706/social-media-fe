import { useEffect, useState } from 'react';
import { getUserPosts } from '../postAPI';
import PostItem from './PostItem';

function UserPostList({ username }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getUserPosts(username)   // truyền userId để API lấy bài viết người khác
      .then((data) => setPosts(data))
      .catch((err) => setError(err?.message || 'Lỗi tải bài viết'))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return <div className="text-gray-500 text-center">Đang tải bài viết...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!posts.length) return <div className="text-gray-500 text-center">Chưa có bài viết nào.</div>;

  return (
    <div className="flex flex-col gap-8 mt-6 w-full">
      {posts.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </div>
  );
}

export default UserPostList;

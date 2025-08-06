import axios from '@/utils/axiosInstance';

// Lấy danh sách bài viết của 1 user (theo userId hoặc username)
export const getUserPosts = async (username) => {
  // Gọi API /posts/user, BE tự lấy user từ token
  const url = username ? `/post/${username}` : '/post/me';
  const res = await axios.get(url);
  return res.posts || [];
};

import axios from '@/utils/axiosInstance';

// Lấy danh sách bài viết của 1 user (theo userId hoặc username)
export const getUserPosts = async () => {
  // Gọi API /posts/user, BE tự lấy user từ token
  const res = await axios.get(`/post/me`);
  return res.posts || [];
};

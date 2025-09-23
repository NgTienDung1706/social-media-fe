import axios from "@/utils/axiosInstance";

// Lấy danh sách bài viết của 1 user (theo userId hoặc username)
// export const getUserPosts = async (username) => {
//   // Gọi API /posts/user, BE tự lấy user từ token
//   const url = username ? `/post/${username}` : '/post/me';
//   const res = await axios.get(url);
//   return res.posts || [];
// };

// Lấy danh sách bài viết của user với phân trang
// Nếu username không có thì lấy bài viết của chính mình
export const getUserPosts = async (username, page, limit) => {
  const url = username
    ? `/post/${username}?page=${page}&limit=${limit}`
    : `/post/me?page=${page}&limit=${limit}`;
  const res = await axios.get(url);
  return {
    posts: res.posts || [],
    hasMore: res.hasMore, // backend trả về true/false
  };
};

export const createPost = async (content, imageUrls) => {
  const res = await axios.post("/post", { content, images: imageUrls });
  return res.post;
};

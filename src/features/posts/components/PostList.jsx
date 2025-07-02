// src/features/home/components/PostList.jsx
import PostItem from '@/features/posts/components/PostItem'

const fakePosts = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    username: "_tiendung",
    time: "8 giờ",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    caption: "Cảm ơn mọi người đã ủng hộ!",
    likes: "189.380",
    comments: "565",
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    username: "_quangtx",
    time: "2 giờ",
    image: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-bien.jpg",
    caption: "Một ngày đẹp trời 🌞",
    likes: "2.345",
    comments: "12",
  },
];

function PostList() {
  return (
    <div className="flex flex-col gap-8 mt-6">
      {fakePosts.map(post => (
        <PostItem key={post.id} {...post} />
      ))}
    </div>
  );
}

export default PostList;

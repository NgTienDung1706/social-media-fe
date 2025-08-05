// src/features/home/components/PostList.jsx
import a from '@/assets/a.jpg';
import example1 from '@/assets/example1.jpg';
import example2 from '@/assets/example2.jpg';
import PostItem from '@/features/posts/components/PostItem'

const fakePosts = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    username: "_tiendung",
    time: "8 giờ",
    imgList: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      a
    ],
    caption: "Cảm ơn mọi người đã ủng hộ!",
    likes: "189.380",
    comments: "565",
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    username: "_quangtx",
    time: "2 giờ",
    imgList: [
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-bien.jpg",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80"
    ],
    caption: "Một ngày đẹp trời 🌞",
    hashtags: ["nature", "sunny"],
    likes: "2.345",
    comments: "12",
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/men/43.jpg",
    username: "_datis.14_",
    time: "2 giờ",
    imgList: [
      example2
    ], 
    caption: "Hoàng hôn nhớ nhà",
    likes: "345",
    comments: "50",
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

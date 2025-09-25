// src/features/home/components/PostList.jsx
import a from "@/assets/a.jpg";
import example1 from "@/assets/example1.jpg";
import example2 from "@/assets/example2.jpg";
import PostItem from "@/features/posts/components/PostItem";

const fakePosts = [
  {
    id: 1,
    avatar: "https://picsum.photos/40/40",
    username: "nguyen_van_a",
    time: "2025-09-25T15:00:00+07:00",
    caption:
      "Chào mọi người! Hôm nay thật tuyệt vời #vui #hạnh_phúc\nCảm ơn mọi người đã ủng hộ #team",
    hashtags: ["vui", "hạnh_phúc", "team"],
    media: ["https://picsum.photos/468/300", "https://picsum.photos/468/350"],
    emotion: { label: "vui vẻ", icon: "😊" },
    tagged_users: [{ username: "tran_thi_b" }, { username: "le_van_c" }],
    location: "Hà Nội",
    isStory: false,
    visibility: "public",
    likes: 120,
    commentCount: 15,
  },
  {
    id: 2,
    avatar: "https://picsum.photos/40/40",
    username: "tran_thi_b",
    time: "2025-09-25T14:30:00+07:00",
    caption: "Đi du lịch ở Đà Lạt, cảnh đẹp mê ly! #travel #dalat",
    hashtags: ["travel", "dalat"],
    media: "https://www.w3schools.com/html/mov_bbb.mp4", // Reliable video URL for testing
    emotion: null,
    tagged_users: [],
    location: "Đà Lạt",
    isStory: false,
    visibility: "friends",
    likes: 85,
    commentCount: 10,
  },
  {
    id: 3,
    avatar: "https://picsum.photos/40/40",
    username: "le_van_c",
    time: "2025-09-25T12:00:00+07:00",
    caption: "Một ngày bình yên, không hashtag, không drama\nChỉ cần thư giãn!",
    hashtags: [],
    media: ["https://picsum.photos/468/350"],
    emotion: { label: "thư giãn", icon: "😌" },
    tagged_users: [{ username: "nguyen_van_a" }],
    location: null,
    isStory: true,
    visibility: "private",
    likes: 45,
    commentCount: 5,
  },
  {
    id: 4,
    avatar: "https://picsum.photos/40/40",
    username: "hoang_thi_d",
    time: "2025-09-25T10:00:00+07:00",
    caption: "Chúc mừng sinh nhật bạn thân! 🎉 #sinhnhat #bestfriend",
    hashtags: ["sinhnhat", "bestfriend"],
    media: [], // Empty media to test no-media case
    emotion: { label: "hạnh phúc", icon: "🎂" },
    tagged_users: [{ username: "tran_thi_b" }],
    location: "TP. Hồ Chí Minh",
    isStory: false,
    visibility: "public",
    likes: 200,
    commentCount: 25,
  },
];
function PostList() {
  return (
    <div className="flex flex-col gap-8 mt-6">
      {fakePosts.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </div>
  );
}

export default PostList;

import React, { useState } from "react";
import { BsFileImage } from "react-icons/bs";
import { FaRegLaughBeam } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";

const mockUser = {
  username: "tttien.dung176",
  avatar: "/assets/default_avatar.png",
};

const mockTaggedUsers = [
  {
    username: "xuanquang.10",
    followers: "142 người theo dõi",
    avatar: "/assets/avatar1.png",
  },
  {
    username: "chet_2004_",
    followers: "20K người theo dõi",
    avatar: "/assets/avatar2.png",
  },
  {
    username: "_jian0419_",
    followers: "752 người theo dõi",
    avatar: "/assets/avatar3.png",
  },
  { username: "_datis.14_", followers: "", avatar: "/assets/avatar4.png" },
];

function convertEmotionToEnglish(label) {
  switch (label) {
    case "hạnh phúc":
      return "happy";
    case "buồn":
      return "sad";
    case "tức giận":
      return "angry";
    case "yêu đời":
      return "loving";
    case "mệt mỏi":
      return "tired";
    case "ngạc nhiên":
      return "surprised";
    case "cô đơn":
      return "lonely";
    default:
      return "unknown";
  }
}

export default function CreatePost({ open, onClose }) {
  const [images, setImages] = useState([]);
  const [currentImg, setCurrentImg] = useState(0);
  const [caption, setCaption] = useState("");
  const [showEmotionPopup, setShowEmotionPopup] = useState(false);
  const [emotion, setEmotion] = useState(null);
  const [showTagPopup, setShowTagPopup] = useState(false);
  const [taggedUsers, setTaggedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  if (!open) return null;

  const emotionList = [
    { label: "hạnh phúc", icon: "😊" },
    { label: "buồn", icon: "😢" },
    { label: "tức giận", icon: "😡" },
    { label: "yêu đời", icon: "😍" },
    { label: "mệt mỏi", icon: "😴" },
    { label: "ngạc nhiên", icon: "😮" },
    { label: "cô đơn", icon: "🥺" },
  ];

  const handleTagUser = (user) => {
    if (!taggedUsers.find((u) => u.username === user.username)) {
      // Thêm người dùng vào danh sách đã gắn thẻ
      setTaggedUsers([...taggedUsers, user]);
      // Loại bỏ người dùng khỏi danh sách gần đây (mockTaggedUsers)
      // Lưu ý: Đây là một bản sao, không thay đổi trực tiếp mockTaggedUsers gốc
      // Nếu bạn cần cập nhật danh sách gốc, hãy tạo một state riêng cho danh sách gần đây
    }
    //setShowTagPopup(false);
  };

  const removeTaggedUser = (userToRemove) => {
    setTaggedUsers(
      taggedUsers.filter((u) => u.username !== userToRemove.username)
    );
  };

  // const getTaggedDisplayText = () => {
  //   if (taggedUsers.length === 0) return "";
  //   if (taggedUsers.length === 1) {
  //     return `cùng với ${taggedUsers[0].username}`;
  //   } else if (taggedUsers.length === 2) {
  //     return `cùng ${taggedUsers[0].username} và ${taggedUsers[1].username}`;
  //   } else {
  //     return `cùng ${taggedUsers[0].username} và ${
  //       taggedUsers.length - 1
  //     } người khác`;
  //   }
  // };
  const getTaggedDisplayText = () => {
    if (taggedUsers.length === 0) return null;

    if (taggedUsers.length === 1) {
      return (
        <>
          <span className="text-gray-500"> cùng với </span>
          <span className="hover:underline cursor-pointer">
            {taggedUsers[0].username}
          </span>
        </>
      );
    } else if (taggedUsers.length === 2) {
      return (
        <>
          <span className="text-gray-500"> cùng </span>
          <span className="hover:underline cursor-pointer">
            {taggedUsers[0].username}
          </span>
          <span className="text-gray-500"> và </span>
          <span className="hover:underline cursor-pointer">
            {taggedUsers[1].username}
          </span>
        </>
      );
    } else {
      return (
        <>
          <span className="text-gray-500"> cùng </span>
          <span className="hover:underline cursor-pointer">
            {taggedUsers[0].username}
          </span>
          <span className="text-gray-500"> và </span>
          <span className="hover:underline cursor-pointer">
            {taggedUsers.length - 1} người khác
          </span>
        </>
      );
    }
  };

  const filteredUsers = mockTaggedUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !taggedUsers.find((tagged) => tagged.username === user.username)
  );
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg flex w-[900px] h-[600px] overflow-hidden flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-2">
          <button className="text-xl" onClick={onClose}>
            ←
          </button>
          <span className="font-semibold text-sm">Tạo bài viết mới</span>
          <button className="text-blue-600 font-semibold text-sm">
            Chia sẻ
          </button>
        </div>
        <div className="flex flex-1">
          {/* Left: Image preview & tag */}
          <div className="relative flex-1 flex items-center justify-center">
            {images.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 bg-white cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const files = Array.from(e.dataTransfer.files).filter((f) =>
                    f.type.startsWith("image/")
                  );
                  if (files.length) {
                    const readers = files.map((file) => {
                      return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) => resolve(e.target.result);
                        reader.readAsDataURL(file);
                      });
                    });
                    Promise.all(readers).then((imgs) => setImages(imgs));
                  }
                }}
              >
                <div className="mb-4">
                  <svg
                    aria-label="Biểu tượng thể hiện file phương tiện, chẳng hạn như hình ảnh hoặc video"
                    fill="currentColor"
                    height="77"
                    role="img"
                    viewBox="0 0 97.6 77.3"
                    width="96"
                  >
                    <title>
                      Biểu tượng thể hiện file phương tiện, chẳng hạn như hình
                      ảnh hoặc video
                    </title>
                    <path
                      d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <div className="text-lg text-gray-600 mb-4">
                  Kéo ảnh và video vào đây
                </div>
                <label className="bg-blue-500 text-white px-3 py-2 rounded-lg font-semibold cursor-pointer">
                  Chọn từ máy tính
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files).filter((f) =>
                        f.type.startsWith("image/")
                      );
                      if (files.length) {
                        const readers = files.map((file) => {
                          return new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.onload = (e) => resolve(e.target.result);
                            reader.readAsDataURL(file);
                          });
                        });
                        Promise.all(readers).then((imgs) => setImages(imgs));
                      }
                    }}
                  />
                </label>
              </div>
            ) : (
              <>
                <button
                  className="absolute top-4 right-4 bg-white bg-opacity-80 rounded-full p-1 shadow text-xl font-bold z-10 hover:bg-red-100"
                  onClick={() => setImages([])}
                  title="Xóa tất cả ảnh"
                >
                  <TiDelete />
                </button>
                <img
                  src={images[currentImg]}
                  alt="preview"
                  className="object-contain max-h-full max-w-full rounded"
                  style={{ width: "100%", height: "100%" }}
                />
                {images.length > 1 && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow"
                      onClick={() =>
                        setCurrentImg((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1
                        )
                      }
                    >
                      &#8592;
                    </button>
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow"
                      onClick={() =>
                        setCurrentImg((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1
                        )
                      }
                    >
                      &#8594;
                    </button>
                  </>
                )}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`w-2 h-2 rounded-full ${
                        idx === currentImg ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          {/* Right: Post form */}
          <div className="w-[468px] flex flex-col p-6 relative border-l">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={mockUser.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="flex items-center whitespace-nowrap text-sm font-semibold gap-1">
                  {mockUser.username}
                  {getTaggedDisplayText()}
                </span>
                {emotion && (
                  <span className="text-gray-700 text-sm flex items-center gap-1 mt-1">
                    Đang cảm thấy {emotion.label} <span>{emotion.icon}</span>
                  </span>
                )}
              </div>
            </div>
            <textarea
              className="w-full border rounded-lg p-2 mb-2 resize-none"
              rows={4}
              maxLength={200}
              placeholder="Viết chú thích..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <div className="text-right text-xs text-gray-400 mb-2">
              {caption.length}/200
            </div>
            <div
              className="flex items-center gap-2 mb-2 cursor-pointer relative"
              onClick={() => setShowEmotionPopup(true)}
            >
              <span
                role="img"
                aria-label="emotion"
                className={emotion ? "text-green-500" : ""}
              >
                <FaRegLaughBeam />
              </span>
              <span
                className={
                  emotion ? "text-green-500 font-semibold" : "text-gray-400"
                }
              >
                Cảm xúc
              </span>
              {emotion && (
                <button
                  className="absolute right-0 text-green-500 text-lg px-2 py-0.5 rounded hover:bg-green-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEmotion(null);
                  }}
                  title="Xóa cảm xúc"
                  style={{ zIndex: 2 }}
                >
                  ×
                </button>
              )}
            </div>
            {showEmotionPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-lg p-6 min-w-[300px] flex flex-col gap-2 relative">
                  <button
                    className="absolute top-2 right-2 text-xl"
                    onClick={() => setShowEmotionPopup(false)}
                  >
                    ×
                  </button>
                  <div className="font-semibold mb-2">Chọn cảm xúc</div>
                  <div className="grid grid-cols-2 gap-2">
                    {emotionList.map((emo) => (
                      <button
                        key={emo.label}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-blue-50"
                        onClick={() => {
                          setEmotion(emo);
                          setShowEmotionPopup(false);
                        }}
                      >
                        <span className="text-xl">{emo.icon}</span>
                        <span>{capitalizeFirstLetter(emo.label)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div
              className="flex items-center gap-2 mb-2 cursor-pointer relative"
              onClick={() => setShowTagPopup(true)}
            >
              <span
                role="img"
                aria-label="collab"
                className={taggedUsers.length ? "text-green-500" : ""}
              >
                <FaTags />
              </span>
              <span
                className={
                  taggedUsers.length
                    ? "text-green-500 font-semibold"
                    : "text-gray-400"
                }
              >
                Gắn thẻ
              </span>
              {taggedUsers.length > 0 && (
                <button
                  className="absolute right-0 text-green-500 text-lg px-2 py-0.5 rounded hover:bg-green-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTaggedUsers([]);
                  }}
                  title="Xóa gắn thẻ"
                  style={{ zIndex: 2 }}
                >
                  ×
                </button>
              )}
            </div>
            {showTagPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-lg p-4 w-[350px] max-h-[500px] overflow-y-auto relative">
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Tìm kiếm"
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <div className="font-semibold text-gray-700 mb-2">
                      Đã gắn thẻ
                    </div>
                    {taggedUsers.map((user) => (
                      <div
                        key={user.username}
                        className="flex items-center justify-between p-2 bg-gray-100 rounded-lg mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={user.avatar}
                            alt={user.username}
                            className="w-8 h-8 rounded-full"
                          />
                          <span>{user.username}</span>
                        </div>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeTaggedUser(user)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mb-2">
                    <div className="font-semibold text-gray-700 mb-2">
                      Gần đây
                    </div>
                    {filteredUsers.map((user) => (
                      <div
                        key={user.username}
                        className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                        onClick={() => handleTagUser(user)}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={user.avatar}
                            alt={user.username}
                            className="w-8 h-8 rounded-full"
                          />
                          <span>{user.username}</span>
                        </div>
                        <span className="text-gray-500">{user.followers}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    className="w-full bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600"
                    onClick={() => setShowTagPopup(false)}
                  >
                    Xong
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

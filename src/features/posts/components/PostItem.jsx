import { FaRegHeart, FaRegComment, FaRegShareSquare } from "react-icons/fa";
import { useState, useMemo, useEffect, useRef } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

dayjs.extend(relativeTime);
dayjs.locale("vi");

function formatTimeAgo(time) {
  if (!time) return "";

  const now = dayjs();
  const diffMinutes = now.diff(time, "minute");
  const diffHours = now.diff(time, "hour");
  const diffDays = now.diff(time, "day");

  if (diffMinutes < 60) {
    return `${diffMinutes <= 0 ? 1 : diffMinutes} phút`;
  } else if (diffHours < 24) {
    return `${diffHours} giờ`;
  } else {
    return `${diffDays} ngày`;
  }
}

function PostItem({
  avatar,
  username,
  time,
  caption,
  hashtags,
  media,
  emotion,
  tagged_users,
  location,
  isStory,
  visibility,
  likes,
  commentCount,
}) {
  const [current, setCurrent] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const touchTimeout = useRef(null);
  const isButtonPressed = useRef(false);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(468);

  // Xử lý media: mảng URL (ảnh) hoặc chuỗi URL (video)
  const mediaList = useMemo(() => {
    if (!media) return [];
    return Array.isArray(media) ? media : [media];
  }, [media]);

  const isVideo = useMemo(() => {
    return (
      !Array.isArray(media) ||
      (mediaList.length === 1 && mediaList[0].endsWith(".mp4")) ||
      mediaList[0].includes("/video/")
    );
  }, [media, mediaList]);

  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        const actualWidth = containerRef.current.offsetWidth;
        setContainerWidth(actualWidth < 468 ? actualWidth : 468);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Touch swipe cho ảnh (không áp dụng cho video)
  const startX = useRef(0);
  const endX = useRef(0);

  const handleTouchStart = (e) => {
    if (isVideo) return; // Không swipe cho video
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (isVideo) return;
    endX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (isVideo || isButtonPressed.current) {
      isButtonPressed.current = false;
      return;
    }

    if (touchTimeout.current) return;
    touchTimeout.current = setTimeout(() => {
      touchTimeout.current = null;
    }, 500);

    const distance = endX.current - startX.current;
    if (distance > 50) {
      setCurrent((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
    } else if (distance < -50) {
      setCurrent((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1));
    }
    startX.current = 0;
    endX.current = 0;
  };

  const handlePrev = () => {
    if (isVideo) return;
    setCurrent((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (isVideo) return;
    setCurrent((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1));
  };

  // Tính toán chiều cao tối đa cho ảnh
  useEffect(() => {
    if (!isVideo && mediaList.length > 0) {
      let highest = 0;
      let loaded = 0;
      const ratios = [];

      mediaList.forEach((src, idx) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          const ratio = img.height / img.width;
          const scaledHeight = ratio * containerWidth;
          highest = Math.max(highest, scaledHeight);
          ratios[idx] = ratio;
          loaded++;
          if (loaded === mediaList.length) {
            setMaxHeight(Math.min(highest)); // Giới hạn chiều cao
          }
        };
        img.onerror = () => {
          ratios[idx] = 1;
          loaded++;
          if (loaded === mediaList.length) {
            setMaxHeight(containerWidth);
          }
        };
      });
    } else {
      // Cho video, set chiều cao mặc định
      setMaxHeight(containerWidth * 0.5625); // 16:9 aspect ratio
    }
  }, [mediaList, containerWidth, isVideo]);

  return (
    <div
      ref={containerRef}
      className="bg-white rounded-lg shadow py-4 w-full max-w-[468px] mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-2 px-4">
        <img
          src={avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">{username}</span>
          <span className="text-xs text-gray-500">
            {formatTimeAgo(time)}
            {isStory && <span className="ml-2 text-blue-500">• Story</span>}
            {visibility !== "public" && (
              <span className="ml-1 text-green-500">
                {visibility === "friends" ? "👥" : "🔒"}
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Tagged Users */}
      {tagged_users && tagged_users.length > 0 && (
        <div className="px-4 mb-2">
          <span className="text-gray-600 text-sm">
            Cùng với{" "}
            {tagged_users.map((u, idx) => (
              <span
                key={idx}
                className="font-medium hover:underline cursor-pointer"
              >
                {u.username}
                {idx < tagged_users.length - 1 ? ", " : ""}
              </span>
            ))}
          </span>
        </div>
      )}

      {/* Media (Image Carousel hoặc Video) */}
      {mediaList.length > 0 && (
        <div
          className="relative w-full bg-black rounded-lg overflow-hidden"
          style={{ height: maxHeight }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {isVideo ? (
            // Hiển thị video
            <video
              src={mediaList[0]}
              controls
              className="w-full h-full object-contain"
              preload="metadata"
            />
          ) : (
            // Hiển thị ảnh carousel
            mediaList.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`post-img-${idx}`}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out ${
                  idx === current ? "opacity-100" : "opacity-0"
                }`}
              />
            ))
          )}

          {/* Navigation cho ảnh (không hiển thị cho video) */}
          {!isVideo && mediaList.length > 1 && (
            <>
              <button
                className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full w-8 h-8 items-center justify-center hover:bg-opacity-60 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  isButtonPressed.current = true;
                  handlePrev();
                }}
              >
                &#8592;
              </button>
              <button
                className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full w-8 h-8 items-center justify-center hover:bg-opacity-60 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  isButtonPressed.current = true;
                  handleNext();
                }}
              >
                &#8594;
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {mediaList.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx === current ? "bg-blue-500" : "bg-gray-300"
                    } inline-block`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Emotion */}
      {emotion?.label && (
        <div className="px-4 mt-2 mb-2">
          <span className="text-sm text-gray-600">
            Đang cảm thấy <span className="font-medium">{emotion.label}</span>{" "}
            {emotion.icon}
          </span>
        </div>
      )}

      {/* Location */}
      {location && (
        <div className="px-4 mb-2">
          <span className="text-sm text-gray-600">📍 {location}</span>
        </div>
      )}

      {/* Caption */}
      {caption && (
        <div className="text-gray-800 text-sm mb-1 px-4">{caption}</div>
      )}

      {/* Hashtags */}
      {Array.isArray(hashtags) && hashtags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-1 px-4">
          {hashtags.map((tag, idx) => (
            <span
              key={idx}
              className="text-blue-500 text-sm font-medium hover:underline cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-6 text-xl text-gray-700 mb-2 mt-2 px-4">
        <button className="hover:text-pink-500 transition-colors">
          <FaRegHeart />
        </button>
        <button className="hover:text-blue-500 transition-colors">
          <FaRegComment />
        </button>
        <button className="hover:text-green-600 transition-colors">
          <FaRegShareSquare />
        </button>
      </div>

      {/* Stats */}
      <div className="text-xs text-gray-500 px-4 pb-2">
        {likes} lượt thích • {commentCount} bình luận
      </div>
    </div>
  );
}

export default PostItem;

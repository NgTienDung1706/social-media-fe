// src/features/home/components/StoryItem.jsx
function StoryItem({ imgSrc, username }) {
  return (
    <div className="flex flex-col items-center min-w-[56px] sm:min-w-[64px]">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-pink-500 p-1 bg-gradient-to-tr from-pink-400 to-yellow-400">
        <img
          src={imgSrc}
          alt={username}
          className="w-full h-full rounded-full object-cover max-w-full"
        />
      </div>
      <span className="text-xs mt-1 text-gray-700 break-words">{username}</span>
    </div>
  );
}

export default StoryItem;

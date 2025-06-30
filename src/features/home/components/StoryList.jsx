// src/features/home/components/StoryList.jsx
function StoryList() {
  return (
    <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-4 border-b border-gray-200 mb-4 max-w-full">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex flex-col items-center min-w-[56px] sm:min-w-[64px]">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-pink-500 p-1 bg-gradient-to-tr from-pink-400 to-yellow-400">
            <img
              src={`https://randomuser.me/api/portraits/men/${30 + i}.jpg`}
              alt="story"
              className="w-full h-full rounded-full object-cover max-w-full"
            />
          </div>
          <span className="text-xs mt-1 text-gray-700 break-words">user{i + 1}</span>
        </div>
      ))}
    </div>
  );
}

export default StoryList;

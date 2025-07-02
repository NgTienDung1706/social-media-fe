// src/features/home/components/StoryList.jsx
import StoryItem from "./StoryItem";

function StoryList() {
  return (
    <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-4 border-b border-gray-200 mb-4 max-w-full">
      {[...Array(8)].map((_, i) => (
        <StoryItem
          key={i}
          imgSrc={`https://randomuser.me/api/portraits/men/${30 + i}.jpg`}
          username={`user${i + 1}`}
        />
      ))}
    </div>
  );
}

export default StoryList;

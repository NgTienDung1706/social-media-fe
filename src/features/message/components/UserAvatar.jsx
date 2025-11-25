const UserAvatar = ({ name, avatarUrl, isOnline }) => {
  return (
    <div className="relative">
      <img
        src={avatarUrl || "/default-avatar.png"}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />
      {isOnline && (
        <div className="absolute -bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white bg-green-500" />
      )}
    </div>
  );
};

export default UserAvatar;

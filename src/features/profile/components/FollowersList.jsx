import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";

const FollowersList = ({ userId, onClose }) => {
  const [followers, setFollowers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/profile/${userId}/followers`);
        setFollowers(res.data);
      } catch (err) {
        setFollowers([]);
      }
      setLoading(false);
    };
    fetchFollowers();
  }, [userId]);

  const handleRemove = async (followerId) => {
    await axios.delete(`/profile/${userId}/followers/${followerId}`);
    setFollowers(followers.filter(u => u._id !== followerId));
  };

  const filtered = followers.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.fullname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="modal">
      <h2>Người theo dõi</h2>
      <input
        type="text"
        placeholder="Tìm kiếm"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-input"
      />
      {loading ? <div>Đang tải...</div> : (
        <ul>
          {filtered.map(user => (
            <li key={user._id} className="user-row">
              <img src={user.avatar || '/assets/default_avatar.png'} alt={user.username} className="avatar" />
              <div>
                <span className="username">{user.username}</span>
                <span className="fullname">{user.fullname}</span>
              </div>
              <button onClick={() => handleRemove(user._id)} className="remove-btn">Xóa</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onClose} className="close-btn">Đóng</button>
    </div>
  );
};

export default FollowersList;

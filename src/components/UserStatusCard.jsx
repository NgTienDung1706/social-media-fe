import { FaMicrophone, FaHeadphones, FaCog } from "react-icons/fa";

function UserStatusCard() {
  return (
    <div className="flex items-center bg-white rounded-xl shadow-lg p-3 w-full max-w-xs border border-gray-200 text-base md:w-72 md:text-base">
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="avatar"
        className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
      />
      <div className="flex-1 ml-3 min-w-0">
        <div className="font-semibold text-gray-900 leading-tight truncate">Tiến Dũng</div>
        <div className="text-xs text-gray-500">Trực tuyến</div>
      </div>
      <div className="flex items-center space-x-3 ml-2">
        {/* <button className="text-gray-400 hover:text-black"><FaMicrophone size={18} /></button> */}
        {/* <button className="text-gray-400 hover:text-black"><FaHeadphones size={18} /></button> */}
        <button className="text-gray-400 hover:text-black" aria-label="Cài đặt" onClick={() => window.location.href = '/profile'}><FaCog size={18} /></button>
      </div>
    </div>
  );
}

export default UserStatusCard;

// src/components/ModalFollowers.jsx
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFollowers, removeFollower } from "@/redux/followersSlice";
import TooltipUser from "./TooltipUser";

export default function Followers({ userId, onClose }) {
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.followers);

  useEffect(() => {
    dispatch(fetchFollowers(userId));
  }, [userId]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 p-4">
        <h2 className="text-lg font-bold mb-3">Người theo dõi</h2>
        {status === "loading" && <p>Đang tải...</p>}
        <ul className="space-y-3">
          {list.map((user) => (
            <li key={user.id} className="flex items-center justify-between">
              <TooltipUser userId={user.id}>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <img src={user.avatar} alt="" className="w-8 h-8 rounded-full" />
                  <span>{user.name}</span>
                </div>
              </TooltipUser>
              <button
                onClick={() => dispatch(removeFollower(user.id))}
                className="text-sm text-red-500 hover:underline"
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-200 px-3 py-1 rounded"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}

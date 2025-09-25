// // src/components/TooltipUser.jsx
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { fetchUserById } from "@/redux/usersSlice";

// export default function TooltipUser({ userId, children }) {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.users.entities[userId]);
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     if (show && !user) {
//       dispatch(fetchUserById(userId));
//     }
//   }, [show]);

//   return (
//     <div
//       className="relative"
//       onMouseEnter={() => setShow(true)}
//       onMouseLeave={() => setShow(false)}
//     >
//       {children}
//       {show && user && (
//         <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-lg rounded-lg p-3 text-sm z-50">
//           <div className="flex items-center space-x-2">
//             <img src={user.avatar} className="w-10 h-10 rounded-full" />
//             <div>
//               <p className="font-bold">{user.name}</p>
//               <p className="text-gray-500">{user.bio}</p>
//             </div>
//           </div>
//           <p className="mt-2 text-gray-600">Bài viết: {user.postsCount}</p>
//         </div>
//       )}
//     </div>
//   );
// }

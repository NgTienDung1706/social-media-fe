import logo from "@/assets/Cham_bochu.png";

function FullScreenLoader() {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-slate-900 z-50">
//       <div className="w-16 h-16 rounded-full border-4 border-transparent bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 animate-spin"></div>
//     </div>
//   );

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Vòng tròn ripple */}
      <div className="relative w-40 h-40 flex items-center justify-center">
        <span className="absolute w-24 h-24 rounded-full bg-cyan-400 opacity-75 animate-ping"></span>
        <span className="absolute w-24 h-24 rounded-full bg-cyan-400 opacity-75 animate-ping delay-300"></span>

        {/* Ảnh ngón tay */}
        <img
          src={logo}
          alt="Touch Logo"
          className="relative z-10 w-24 h-24 object-contain"
        />
      </div>

      {/* Text */}
      <p className="mt-6 text-brand-green text-lg font-semibold animate-pulse">
        Loading...
      </p>
    </div>
  );



}
export default FullScreenLoader;
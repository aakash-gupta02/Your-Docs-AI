// import React from "react";
// import { useAuth } from "../context/AuthContext"; // adjust path
// import { toast } from "react-hot-toast"; // optional for alert
// import { Link, useNavigate } from "react-router-dom";
// import InputForm from "./InputForm";

// function TopActionBar({ showInput, toggleInput }) {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const handleAI = () => {
//     if (!user) {
//       toast.error("Please login to use this feature.");
//     } else {
//       navigate("/ai-chat");
//     }
//   };

//   return (
//     <div className="fixed top-6 right-6 flex items-center gap-4 z-50">

//       {user ? (
//         <>
//           {/* User Initials/Profile */}
//           <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
//             {user.username?.[0].toUpperCase() || "U"}
//           </div>

//           {/* AI Button - Active */}
//           <button
//             onClick={handleAI}
//             className="bg-green-500 text-white rounded-full p-3 hover:bg-green-600 transition"
//           >
//             🤖
//           </button>
//         </>
//       ) : (
//         <>
//           {/* Login/Signup */}
//           <button
//             onClick={() => {
//               navigate("/login");
//             }}
//             className="bg-blue-600 border border-gray-400 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
//           >
//             Login / Signup
//           </button>

//           {/* AI Button - Disabled */}
//           <button
//             onClick={handleAI}
//             className="bg-gray-200 text-gray-400 rounded-full p-3 cursor-not-allowed"
//             title="Login to access"
//           >
//             🤖
//           </button>
//         </>
//       )}

//       <InputForm />
//     </div>
//   );
// }

// export default TopActionBar;

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import InputForm from "./InputForm";

function TopActionBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleAI = () => {
    if (!user) {
      toast.error("Please login to access AI Assistant");
      return;
    }
    navigate("/ai-chat");
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    // <nav className=" z-50 flex items-center gap-4 text-white">
    <nav className=" z-50 flex items-center gap-2 text-white">
      {/* AI Assistant Button */}

      <button
        onClick={handleAI}
        className={`group flex items-center h-10 rounded-full transition-all duration-300 overflow-hidden ${
          user
            ? "bg-sky-500 hover:bg-sky-600 text-white pl-3 pr-4"
            : "bg-gray-600/40 text-gray-300 cursor-not-allowed px-3"
        }`}
        title={user ? "Ask AI Assistant" : "Login to use AI"}
        style={{
          width: user ? "40px" : "40px",
        }}
        onMouseEnter={(e) => {
          if (user) e.currentTarget.style.width = "145px";
        }}
        onMouseLeave={(e) => {
          if (user) e.currentTarget.style.width = "40px";
        }}
      >
        <i className="ri-robot-2-line text-lg" />
        {user && (
          <span className="ml-2 whitespace-nowrap overflow-hidden transition-opacity duration-200 opacity-0 group-hover:opacity-100">
            AI Assistant
          </span>
        )}
      </button>

      {/* User Section */}
      {user ? (
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="group flex items-center h-10 rounded-full bg-sky-600 text-white pl-3 pr-4 transition-all duration-300 overflow-hidden"
            style={{
              width: "40px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.width = "80px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.width = "40px";
            }}
          >
            <span className="text-lg font-bold">
              {user.username?.[0].toUpperCase() || "U"}
            </span>
            <span className="ml-2 whitespace-nowrap overflow-hidden opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {user.username}
            </span>
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-xl w-40 py-2 shadow-lg">
              <p className="text-sm px-4 py-2 text-white border-b border-zinc-700">
                Signed in as <br />
                <span className="font-semibold">{user.username}</span>
              </p>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500 hover:text-white text-sm transition"
              >
                Logout
              </button>
              
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-sm rounded-full font-semibold transition"
        >
          Login / Signup
        </button>
      )}

      {/* <InputForm /> */}
    </nav>
  );
}

export default TopActionBar;

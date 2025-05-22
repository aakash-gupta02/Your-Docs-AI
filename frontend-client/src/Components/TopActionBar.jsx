// // TopActionBar.jsx
// import React from 'react';
// import { motion } from 'framer-motion';

// function TopActionBar({ showInput, toggleInput }) {
//   return (
//     <div className="fixed top-6 right-6 flex items-center gap-4 z-50">
//       {!showInput && (
//         <>
//           <button className="profile-btn">👤</button>
//           <button className="ai-btn">🤖</button>
//         </>
//       )}
//       <motion.button
//         onClick={toggleInput}
//         whileTap={{ scale: 0.9 }}
//         className="add-task-btn bg-blue-600 text-white rounded-full p-3 text-xl hover:bg-blue-700 transition"
//       >
//         {showInput ? <i className="ri-close-line" /> : <i className="ri-add-line" />}
//       </motion.button>
//     </div>
//   );
// }

// export default TopActionBar;

import React from "react";
import { useAuth } from "../context/AuthContext"; // adjust path
import { toast } from "react-hot-toast"; // optional for alert
import { Link, useNavigate } from "react-router-dom";


function TopActionBar({ showInput, toggleInput }) {
  const { user } = useAuth();
  const navigate = useNavigate()

  const handleAI = () => {
    if (!user) {
      toast.error("Please login to use this feature.");
    } else {
      // Open AI modal or run AI logic
      console.log("AI Activated");
    }
  };

  return (
    <div className="fixed top-6 right-6 flex items-center gap-4 z-50">
      {!showInput && (
        <>
          {user ? (
            <>
              {/* User Initials/Profile */}
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                {user.name?.[0].toUpperCase() || "U"}
              </div>

              {/* AI Button - Active */}
              <button
                onClick={handleAI}
                className="bg-green-500 text-white rounded-full p-3 hover:bg-green-600 transition"
              >
                🤖
              </button>
            </>
          ) : (
            <>
              {/* Login/Signup */}
              <button
              onClick={()=>{
                navigate("/login")
              }}
              className="bg-blue-600 border border-gray-400 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition">
                Login / Signup
              </button>

              {/* AI Button - Disabled */}
              <button
                onClick={handleAI}
                className="bg-gray-200 text-gray-400 rounded-full p-3 cursor-not-allowed"
                title="Login to access"
              >
                🤖
              </button>
            </>
          )}
        </>
      )}

      {/* + Button */}
      <button
        onClick={toggleInput}
        className="bg-blue-600 text-white rounded-full p-3 text-xl hover:bg-blue-700 transition"
      >
        {showInput ? (
          <i className="ri-close-line" />
        ) : (
          <i className="ri-add-line" />
        )}
      </button>
    </div>
  );
}

export default TopActionBar;

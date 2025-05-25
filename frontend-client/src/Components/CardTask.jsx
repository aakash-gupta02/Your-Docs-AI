// import React, { useState } from "react";
// import { motion } from "motion/react";
// import { useNavigate } from "react-router-dom";

// function CardTask({ data, dragConstraints }) {
//   const { title, content, createdAt, _id } = data;
//   const navigate = useNavigate();
//   const [dragging, setDragging] = useState(false);

//   const getByteSize = (text) => new TextEncoder().encode(text).length;
//   const formatBytes = (bytes) => {
//     if (bytes < 1024) return `${bytes} bytes`;
//     else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
//     else return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
//   };
//   const truncateText = (text, wordLimit = 20) => {
//     const words = text.split(" ");
//     if (words.length <= wordLimit) return text;
//     return words.slice(0, wordLimit).join(" ") + "...";
//   };

//   const contentSize = formatBytes(getByteSize(content));

//   const handleClick = () => {
//     if (!dragging) {
//       navigate(`/read/${_id}`);
//     }
//   };

//   return (
//     <motion.div
//       drag
//       dragConstraints={dragConstraints}
//       dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
//       whileDrag={{ scale: 1.1 }}
//       dragElastic={1}
//       onClick={handleClick}
//       onDragStart={() => setDragging(true)}
//       onDragEnd={() => {
//         setTimeout(() => setDragging(false), 50); // Small delay to prevent quick trigger
//       }}
//       className="card w-52 h-64 text-white bg-zinc-900/80 rounded-[50px] px-8 py-8 relative overflow-hidden hover:shadow-lg hover:shadow-blue-500/30"
//     >
//       <span className="text-xl">
//         <i className="ri-file-text-line"></i>
//       </span>

//       <p className="text-sm mt-3 text-sky-500 leading-5">{title}</p>

//       <p className="text-sm text-gray-300 leading-5 mb-4">
//         {truncateText(content, 10)}
//       </p>

//       <div className="footer w-full absolute bottom-0 left-0">
//         <div className="footer flex justify-between items-center px-5 mb-10">
//           <h4 className="text-sm">{contentSize}</h4>
//           <i className="ri-file-download-line"></i>
//         </div>
//         <div className="footer w-full bg-sky-600 absolute bottom-0 left-0 flex items-center justify-center">
//           <h4 className="m-3 text-[12px] font-semibold">Download Now...</h4>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default CardTask;


import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function CardTask({ data, dragConstraints }) {
  const { title, content, createdAt, _id } = data;
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);

  const getByteSize = (text) => new TextEncoder().encode(text).length;
  const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes} bytes`;
    else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    else return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };
  const truncateText = (text, wordLimit = 20) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const contentSize = formatBytes(getByteSize(content));
  const formattedDate = dayjs(createdAt).format("DD MMM, YYYY");

  const handleClick = () => {
    if (!dragging) {
      navigate(`/read/${_id}`);
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={dragConstraints}
      dragElastic={0.25} // ✅ Soft realistic drag
      dragTransition={{ bounceStiffness: 80, bounceDamping: 12 }}
      whileDrag={{ scale: 1.04 }}
      onClick={handleClick}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setTimeout(() => setDragging(false), 50)}
      className="card w-52 h-64 text-white bg-zinc-900/90 rounded-[50px] px-6 py-6 relative overflow-hidden shadow-lg hover:shadow-blue-500/50 transition-shadow duration-200"
    >
      {/* Icon */}
      <span className="text-2xl text-white">
        <i className="ri-file-text-line"></i>
      </span>

      {/* Title */}
      <p className="text-sm mt-3 text-sky-500 font-semibold line-clamp-2">
        {title}
      </p>

      {/* Content */}
      <p className="text-xs text-gray-300 leading-5 mt-2 mb-4 line-clamp-4">
        {truncateText(content, 15)}
      </p>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full rounded-b-[50px] overflow-hidden">
        <div className="flex justify-between items-center px-5 py-2 text-[11px] text-gray-400 bg-zinc-800/10">
          <span>{formattedDate}</span>
          <span>{contentSize}</span>
        </div>
        <div className="bg-sky-600 text-center py-2 text-sm font-medium hover:bg-sky-700 transition-colors cursor-pointer">
          <span className="flex items-center justify-center gap-1 text-white">
           Read Note
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default CardTask;

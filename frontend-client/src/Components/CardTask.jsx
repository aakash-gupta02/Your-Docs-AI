import React from "react";
import { motion } from "motion/react";

function CardTask({ data, refrence }) {
  return (
    <div>
      <motion.div
        drag
        dragConstraints={refrence}
        dragTransition={{bounceStiffness:100, bounceDamping:10}}
        whileDrag={{ scale: 1.1 }}
        dragElastic={1}
        className=" card w-52 h-64 bg-zinc-900/80 rounded-[50px] px-8 py-8 relative overflow-hidden hover:shadow-lg hover:shadow-blue-500/30"
      >
        <span className="text-xl">
          <i class="ri-file-text-line"></i>
        </span>

        

        <p className="text-sm mt-3 leading-5">{data.task}</p>

        <div className="footer w-full absolute bottom-0 left-0 ">
          <div className="footer flex justify-between items-center px-5 mb-10">
            <h4 className="text-sm">2.4 mb</h4>
            {true ? (
              <i class="ri-file-download-line"></i>
            ) : (
              <i class="ri-close-circle-line"></i>
            )}
          </div>
          {true ? (
            <div className="footer w-full bg-sky-600  absolute bottom-0 left-0 flex items-center justify-center">
              <h4 className="m-3 text-[12px] font-semibold">Download Now...</h4>
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}

export default CardTask;

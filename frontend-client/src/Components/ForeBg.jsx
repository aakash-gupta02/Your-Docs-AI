import React, { useRef, useState } from "react";
import CardTask from "./CardTask";
import { h1 } from "motion/react-client";

function ForeBg() {
  const [task, settask] = useState();
  const [mainTask, setmainTask] = useState([]);

  const [showInput, setShowInput] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setmainTask([...mainTask, { task }]);
    settask("");
    console.log(task);
  };

  let renderTask = <CardTask />;

  renderTask = mainTask.map((e, i) => {
    return <h1> {e.task}</h1>;
  });
  // console.log(renderTask);

  const ref = useRef();

  const data = [
    {
      desc: [renderTask],
      filesize: "0.9mb",
      close: true,
      isOpen: true,
    },
  ];

  return (
    <div className="">
      {/* <div className="py-5 select-none">

        <form
          className="flex items-center justify-center gap-5"
          onSubmit={submitHandler}
        >
          <input
            value={task}
            onChange={(e) => {
              settask(e.target.value);
            }}
            className="px-6 py-2 rounded-3xl text-gray-700"
            type="text"
            placeholder="Enter Your Task..."
          />

          <button className="bg-blue-800 px-6 py-3 rounded-3xl hover:bg-blue-500 ">
            Add Task
          </button>
        </form>


      </div> */}

      <div className="select-none py-6">
        {/* + Button (Visible when input bar is hidden) */}
        {!showInput && (
          <button
            onClick={() => setShowInput(true)}
            className="bg-blue-600 text-white rounded-full py-4 px-5 text-2xl font-semibold fixed top-6 right-6 z-50 hover:bg-blue-700 transition-all"
          >
            <i class="ri-add-circle-line"></i>
          </button>
        )}

        {/* Sliding Input Bar */}
        <div
          className={`fixed top-6 flex items-center gap-3 transition-all duration-700 ease-in-out z-40 ${
            showInput
              ? "left-1/2 -translate-x-1/2 opacity-100"
              : "-translate-x-full left-0 opacity-0"
          }`}
        >
          <form
            className="flex items-center justify-center gap-5"
            onSubmit={submitHandler}
          >
            <input
              value={task}
              onChange={(e) => {
                settask(e.target.value);
              }}
              type="text"
              placeholder="Enter your task..."
              className="px-4 py-2 rounded-full outline-none text-black w-64"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
              Add Task
            </button>
            
          </form> </div>

        { showInput && <button
            onClick={() => setShowInput(false)}
            className="bg-blue-600 text-white rounded-full py-4 px-5 text-2xl font-semibold fixed top-6 right-6 z-50 hover:bg-blue-700 transition-all"
          >
           <i class="ri-close-circle-line"></i>
          </button>}

       
      </div>

      <div ref={ref} className=" h-full z-[3] p-6 flex flex-wrap gap-8">
        {mainTask.map((elem, index) => (
          <CardTask data={elem} refrence={ref} />
        ))}
      </div>
    </div>
  );
}

export default ForeBg;

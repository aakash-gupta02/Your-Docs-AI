import React, { useRef, useState } from "react";
import CardTask from "./CardTask";
import InputBar from "./InputForm";
import TopActionBar from "./TopActionBar";

function ForeBg() {
  const [task, setTask] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [showInput, setShowInput] = useState(false);

  const ref = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    if (task.trim()) {
      setMainTask([...mainTask, { task }]);
      setTask("");
    }
  };

  return (
    <div>
      
      {/* + or Close button */}
      <TopActionBar showInput={showInput} toggleInput={() => setShowInput(!showInput)} />
      {/* {!showInput ? (
        <button
          onClick={() => setShowInput(true)}
          className="bg-blue-600 text-white rounded-full py-4 px-5 text-2xl font-semibold fixed top-6 right-6 z-50 hover:bg-blue-700 transition-all"
        >
          <i className="ri-add-circle-line"></i>
        </button>
      ) : (
        <button
          onClick={() => setShowInput(false)}
          className="bg-blue-600 text-white rounded-full py-4 px-5 text-2xl font-semibold fixed top-6 right-6 z-50 hover:bg-blue-700 transition-all"
        >
          <i className="ri-close-circle-line"></i>
        </button>
      )} */}

      {/* Input Bar */}
      
      <InputBar
        showInput={showInput}
        task={task}
        setTask={setTask}
        submitHandler={submitHandler}
      />

      {/* Task Cards */}
      <div ref={ref} className="h-full z-[3] p-6 flex flex-wrap gap-8">
        {mainTask.map((elem, index) => (
          <CardTask key={index} data={elem} refrence={ref} />
        ))}
      </div>
    </div>
  );
}

export default ForeBg;

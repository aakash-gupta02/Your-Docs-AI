// import React, { useRef, useState } from "react";
// import CardTask from "./CardTask";
// import InputBar from "./InputForm";
// import TopActionBar from "./TopActionBar";

// function ForeBg() {
//   const [task, setTask] = useState("");
//   const [mainTask, setMainTask] = useState([]);
//   const [showInput, setShowInput] = useState(false);

//   const ref = useRef();

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (task.trim()) {
//       setMainTask([...mainTask, { task }]);
//       setTask("");
//     }
//   };

//   return (
//     <div>

//       {/* + or Close button */}
//       <TopActionBar showInput={showInput} toggleInput={() => setShowInput(!showInput)} />

//       {/* Input Bar */}

//       <InputBar
//         showInput={showInput}
//         task={task}
//         setTask={setTask}
//         submitHandler={submitHandler}
//       />

//       {/* Task Cards */}
//       <div ref={ref} className="h-full z-[3] p-6 flex flex-wrap gap-8">
//         {mainTask.map((elem, index) => (
//           <CardTask key={index} data={elem} refrence={ref} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ForeBg;

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import CardTask from "./CardTask"; // assumes CardTask accepts a doc with title & content
import { toast } from "react-toastify";
import InputForm from "./InputForm";
import TopActionBar from "./TopActionBar";

function ForeBg() {
  const [docs, setDocs] = useState([]);
    const [dragConstraints, setDragConstraints] = useState(null);

  const ref = useRef();
  
    useEffect(() => {
    if (ref.current) {
      setDragConstraints(ref);
    }
  }, [ref]);

  const fetchDocs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/docs/alldocs",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDocs(data);
    } catch (err) {
      toast.error("Failed to fetch documents");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <div className="p-6 flex flex-wrap gap-6">
      <TopActionBar />
      <InputForm />

      {/* <div 
  className="relative h-[calc(100vh-100px)] w-full p-6 flex flex-wrap gap-8 z-[3] overflow-hidden border-2 border-red-500"
      >
        {docs.length === 0 ? (
          <p className="text-gray-500">No documents found.</p>
        ) : (
          docs.map((doc) => (
            <CardTask key={doc._id} data={doc} refrence={ref} />
          ))
        )}
      </div> */}

   <div
  ref={ref}
  className="fixed inset-0 overflow-hidden z-[3] p-6 flex flex-wrap gap-8"
>

      {docs.length === 0 ? (
        <p className="text-gray-500">No documents found.</p>
      ) : (
        dragConstraints &&
        docs.map((doc) => (
          <CardTask key={doc._id} data={doc} dragConstraints={dragConstraints} />
        ))
      )}
    </div>

    </div>
  );
}

export default ForeBg;

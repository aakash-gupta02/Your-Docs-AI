import React, { useState } from "react";
import Bg from "./Components/Bg";
import ForeBg from "./Components/ForeBg";
import Trial from "./Components/Trial";
import { h1, sub } from "motion/react-client";

function App() {
 
  return (
    <div className="w-full overflow-x-hidden min-h-screen h-full bg-zinc-800">
      <Bg />
      {/* <Trial/> */}
      <ForeBg/>
    
    </div>
  );
}

export default App;

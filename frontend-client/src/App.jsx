import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login"; // Uncomment when ready
import Register from "./pages/Register"; // Uncomment when ready
// import AIPage from "./pages/AIPage"; // Uncomment when ready

function App() {
  return (
 
      <div className="w-full overflow-x-hidden min-h-screen h-full bg-zinc-800">
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        
        <Routes>
          {/* Main Home Route */}
          <Route path="/" element={<Home />} />
          
          {/* Auth Routes (commented out for now) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* AI Feature Route (commented out for now) */}
          {/* <Route path="/ai" element={<AIPage />} /> */}
          
          {/* Optional: 404 Page */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
   
  );
}

export default App;
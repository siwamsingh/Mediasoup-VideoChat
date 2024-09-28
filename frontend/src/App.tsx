import socket from "./socket.ts";
import { useEffect } from "react";
import Video from "./components/video/Video.tsx";
import Video2 from "./components/video/Video2.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";

function App() {
  useEffect(() => {
    function onConnect() {
      console.log("socket connected ", socket.id);
    }

    function onDisconnect() {
      console.log("disconnected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/:room" element={<Video2 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

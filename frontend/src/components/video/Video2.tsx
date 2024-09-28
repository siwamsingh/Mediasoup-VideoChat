import React, { useEffect, useRef } from "react";
import { RefObject } from "react";
import joinRoom from "../../mediasoup/joinRoom";
import getLocalStream from "../../mediasoup/getLocalStream";
import { getProducers } from "../../mediasoup/createSendTransport";

interface VideoComponentProps {}

let videoContainerRef: RefObject<HTMLDivElement>;

const Video2: React.FC<VideoComponentProps> = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    joinRoom();

    // Run getProducers after a short delay
    const timer = setTimeout(() => {
      // getProducers();
    }, 500); // Delay of 500ms

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const handleVideoBtnClick = () => {
    getLocalStream(localVideoRef, "video");
    console.log("Publish button clicked");
  };

  const handleAudioBtnClick = () => {
    getLocalStream(localVideoRef, "audio");
    getProducers();
    console.log("Publish button clicked");
  };

  const handlePlayAllAudio = () => {
    if (videoContainerRef.current) {
      const audioElements = videoContainerRef.current.getElementsByTagName("audio");
      Array.from(audioElements).forEach((audio) => {
        audio.play().catch((error) => {
          console.error("Failed to autoplay audio:", error);
          // If autoplay is blocked, show a user prompt (optional)
          const playButton = document.createElement("button");
          playButton.textContent = "Click to play audio";
          playButton.classList.add("btn", "btn-sm", "btn-dark", "mt-2");
          playButton.addEventListener("click", () => {
            audio.play().catch((err) => console.error("Play failed again:", err));
            playButton.remove(); // Remove the button once played
          });
          audio.parentNode?.appendChild(playButton);
        });
      });
    } else {
      console.error("videoContainerRef is null");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 min-h-screen p-4 text-gray-200">
      <div className="w-full max-w-screen bg-gray-800 shadow-lg rounded-lg p-4 space-y-4 border border-gray-700">
        <div className="flex flex-col items-center w-full">
          {/* Container for video elements */}
          <div
            className="flex flex-wrap gap-[2px] justify-center w-full h-[75vh] p-2 border border-gray-700 rounded-lg bg-gray-800"
            ref={videoContainerRef}
            style={{ maxHeight: "75vh", overflowY: "auto" }}
          >
            {/* Local video element */}
            <div className=" bg-gray-700 w-[50%] sm:w-[33%] sm:h-[50%] rounded-md relative border border-blue-600">
              <video
                id="localVideo"
                ref={localVideoRef}
                autoPlay
                muted
                className="w-full h-full object-contain rounded-lg border border-gray-600"
              ></video>
            </div>

            {/* Other remote video elements will be dynamically added here */}
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="absolute bottom-4 md:bottom-6 flex flex-wrap justify-center gap-4 mt-4">
        {/* Video Button */}
        <button onClick={handleVideoBtnClick} className="btn btn-primary flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-3 4H5a2 2 0 01-2-2V8a2 2 0 012-2h7a2 2 0 012 2v8a2 2 0 01-2 2z"
            />
          </svg>
          <span>Start Video</span>
        </button>

        {/* Audio Button */}
        <button onClick={handleAudioBtnClick} className="btn btn-primary flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 1C10.8954 1 10 1.89543 10 3V11C10 12.1046 10.8954 13 12 13C13.1046 13 14 12.1046 14 11V3C14 1.89543 13.1046 1 12 1ZM5 10C5 13.3137 7.68629 16 11 16H13C16.3137 16 19 13.3137 19 10M8 19H16M12 16V19M10 22H14"
            />
          </svg>
          <span>Start Audio</span>
        </button>

        {/* Unmute All Button */}
        <button onClick={handlePlayAllAudio} className="btn btn-dark">
          Unmute Everyone
        </button>
      </div>
    </div>
  );
};

export default Video2;
export { videoContainerRef };

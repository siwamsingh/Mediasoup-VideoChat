import React, { useEffect, useRef } from "react";
import { RefObject } from "react";
import joinRoom from "../../mediasoup/joinRoom";
import getLocalStream from "../../mediasoup/getLocalStream";
import { getProducers } from "../../mediasoup/createSendTransport";

interface VideoComponentProps {}

let videoContainerRef: RefObject<HTMLDivElement>;

const Video: React.FC<VideoComponentProps> = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    joinRoom();

    // Run getProducers after a 3-second delay
    const timer = setTimeout(() => {
      getProducers();
    }, 500); // Delay of 3000ms (3 seconds)

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
      const audioElements =
        videoContainerRef.current.getElementsByTagName("audio");
      Array.from(audioElements).forEach((audio) => {
        audio.play().catch((error) => {
          console.error("Failed to autoplay audio:", error);
          // If autoplay is blocked, show a user prompt (optional)
          const playButton = document.createElement("button");
          playButton.textContent = "Click to play audio";
          playButton.addEventListener("click", () => {
            audio
              .play()
              .catch((err) => console.error("Play failed again:", err));
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
    <div className="flex flex-col items-center border h-screen space-y-4">
      <div className="flex flex-col items-center space-y-4 pt-20 w-full mx-auto ">
        {/* <div className=" max-w-[800px] min-w-[70vh]  w-fit  h-[60vh] rounded-xl overflow-hidden border border-gray-500">
          
        </div> */}
        <div className="w-full border px-10  ">
          <div
            className=" w-full h-[80vh] flex flex-wrap  justify-center"
            ref={videoContainerRef}
          >
            <video
              id="localVideo"
              ref={localVideoRef}
              autoPlay
              muted
              className="max-h-[60vh] "
            ></video>
          </div>
        </div>
      </div>

      <div className="flex absolute z-20 bottom-5 justify-center gap-2">
        {/* video btn*/}
        <button
          id="btnPublish"
          onClick={handleVideoBtnClick}
          className="btn btn-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            className="w-10 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-3 4H5a2 2 0 01-2-2V8a2 2 0 012-2h7a2 2 0 012 2v8a2 2 0 01-2 2z"
            />
          </svg>
        </button>

        {/* audio btn */}
        <button
          id="btnPublish"
          onClick={handleAudioBtnClick}
          className="btn btn-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            className="w-10 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 1C10.8954 1 10 1.89543 10 3V11C10 12.1046 10.8954 13 12 13C13.1046 13 14 12.1046 14 11V3C14 1.89543 13.1046 1 12 1ZM5 10C5 13.3137 7.68629 16 11 16H13C16.3137 16 19 13.3137 19 10M8 19H16M12 16V19M10 22H14"
            />
          </svg>
        </button>

        <button onClick={handlePlayAllAudio} className="btn btn-secondary">
          Unmute Everyone
        </button>
      </div>
    </div>
  );
};

export default Video;
export { videoContainerRef };

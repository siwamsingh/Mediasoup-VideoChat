import React, { useState, useEffect } from "react";

function Navbar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    setIsExpanded(true);
    const timer = setTimeout(() => {
      setIsExpanded(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`absolute z-20 ${isExpanded ? "w-screen" : "w-fit"} bg-transparent transition-all duration-500 ease-in-out`}
    >
      <div
        className={`navbar rounded-full py-3 px-2 md:px-2 bg-transparent transition-all duration-500 ease-in-out overflow-hidden`}
      >
        <div role="alert" className="p-1 alert flex items-center">
          <div className="flex justify-start items-start">
            <button onClick={handleToggle} aria-label="Toggle Navbar" className="transition-transform duration-500 ease-in-out transform hover:scale-110 focus:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 64"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-14 h-14 text-blue-500 transition-opacity duration-500 ease-in-out opacity-100"
              >
                {/* Water Waves */}
                <path
                  d="M2 30c4 3 8 3 12 0s8-3 12 0 8 3 12 0 8-3 12 0"
                  stroke="#60a5fa"
                  fill="none"
                />
                <path
                  d="M2 38c4 3 8 3 12 0s8-3 12 0 8 3 12 0 8-3 12 0"
                  stroke="#38bdf8"
                  fill="none"
                />

                {/* Video Camera */}
                <rect
                  x="10"
                  y="8"
                  width="24"
                  height="18"
                  rx="3"
                  ry="3"
                  stroke="#1e3a8a"
                  fill="none"
                />
                <polygon points="38,12 50,18 38,24" fill="#1e3a8a" />

                {/* River Flow Indicator */}
                <path
                  d="M16 50c2-3 6-3 8 0s6-3 8 0 6-3 8 0"
                  stroke="#0ea5e9"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </button>
          </div>
          {isExpanded && (
            <span
              className={`transition-transform duration-500 ease-in-out transform origin-right scale-100 opacity-100 ml-4`}
            >
              Note: Prototype version. Toggle video/audio are still not working.
              To actually join the call, try streaming video or audio. Happy
              Chatting.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

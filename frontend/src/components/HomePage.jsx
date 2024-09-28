import { useEffect, useState } from 'react';
import WAVES from 'vanta/dist/vanta.waves.min';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function HomePage() {
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    WAVES({
      el: '#vanta',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
    });
  }, []);

  const handleJoinRoom = () => {
    if (roomName.trim()) {
      navigate(`/${roomName.trim()}`);
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] overflow-hidden">
      <Navbar/>
      <div id="vanta" className="h-full">
        <div className="hero min-h-screen">
          <div className=""></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h2 className="mb-5 text-3xl text-white font-bold">
                Join / Create Room
              </h2>
              <input
                type="text"
                placeholder="Room Id"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="input text-white input-bordered input-info w-full max-w-xs mb-5 bg-opacity-60"
              />
              <button
                className="btn shadow-orange-400 text-white"
                onClick={handleJoinRoom}
              >
                Join Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

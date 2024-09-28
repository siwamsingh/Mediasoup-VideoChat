import socket from "../socket"
import createDevice from "./createDevice";

let rtpCapabilities: object ;

const joinRoom = () => {
  const roomName = window.location.pathname.split('/')[1]
  
  socket.emit('joinRoom', { roomName }, (data: {rtpCapabilities: object}) => {
    console.log(`Router RTP Capabilities... ${data.rtpCapabilities}`)
    // we assign to local variable and will be used when
    // loading the client Device (see createDevice above)

    rtpCapabilities = data.rtpCapabilities

    // once we have rtpCapabilities from the Router, create Device
    createDevice();
  })
}

export default joinRoom;
export {rtpCapabilities}
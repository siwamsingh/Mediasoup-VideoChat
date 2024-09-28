import mediaCodecs from "../mediasoup/mediaCodecs.js"

const joinRoom = async ( roomName,socket,rooms,peers,worker, callback) => {
  // create Router if it does not exist
  const {router1,rooms1} = await createRoom(roomName, socket.id , rooms , worker)

  peers[socket.id] = {
    socket,
    roomName,
    transports: [],
    producers: [],
    consumers: [],
    peerDetails: {
      name: '',
      isAdmin: false,  
    }
  }

  // get Router RTP Capabilities
  const rtpCapabilities = router1.rtpCapabilities

  // call callback from the client and send back the rtpCapabilities
  callback({ rtpCapabilities })

  return [rooms1,peers];
}

const createRoom = async (roomName, socketId , rooms , worker) => {
  // worker.createRouter(options)
  // options = { mediaCodecs, appData }
  // mediaCodecs -> defined above
  // appData -> custom application data - we are not supplying any
  // none of the two are required
  let router1
  let peers = []
  
  if (rooms[roomName]) {
    router1 = rooms[roomName].router
    peers = rooms[roomName].peers || []
  } else {
    router1 = await worker.createRouter({ mediaCodecs, })
  }
  
  console.log(`Router ID: ${router1.id}`, peers.length)

  rooms[roomName] = {
    router: router1,
    peers: [...peers, socketId],
  }
  
  let rooms1=rooms

  return {router1,rooms1}
}

export default joinRoom
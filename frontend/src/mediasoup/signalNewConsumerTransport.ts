import socket from "../socket";
import { device , connectRecvTransport} from "./allExports";

let consumingTransports: Array<String> = []

const signalNewConsumerTransport = async (remoteProducerId: string) => {
  
  console.log("Get Producer -----------",remoteProducerId);
  
  
  //check if we are already consuming the remoteProducerId
  if (consumingTransports.includes(remoteProducerId) ){
    console.log("returned ...");
    return;
  }
  
  consumingTransports.push(remoteProducerId);

  socket.emit('createWebRtcTransport', { consumer: true }, ({ params }) => {
    // The server sends back params needed 
    // to create Send Transport on the client side
    if (params.error) {
      console.log(params.error)
      return
    }

    console.log(`PARAMS... ${params}`)

    let consumerTransport
    try {
      consumerTransport = device.createRecvTransport(params)
    } catch (error) {
      // exceptions: 
      // {InvalidStateError} if not loaded
      // {TypeError} if wrong arguments.
      console.log(error)
      return
    }

    consumerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
      try {
        // Signal local DTLS parameters to the server side transport
        // see server's socket.on('transport-recv-connect', ...)
        socket.emit('transport-recv-connect', {
          dtlsParameters,
          serverConsumerTransportId: params.id,
        })

        // Tell the transport that parameters were transmitted.
        callback()
      } catch (error: any) {
        // Tell the transport that something was wrong
        errback(error)
      }
    })

    connectRecvTransport(consumerTransport, remoteProducerId, params.id)
  })
}

socket.on('new-producer', ({ producerId }) => signalNewConsumerTransport(producerId))

export default signalNewConsumerTransport
export {consumingTransports}
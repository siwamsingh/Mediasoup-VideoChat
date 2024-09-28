import { Transport } from "mediasoup-client/lib/types";
import socket from "../socket"
import { device } from "./allExports"
import { signalNewConsumerTransport } from "./allExports"

let producerTransport: Transport ;

const getProducers = () => {
  socket.emit('getProducers', producerIds => {
    console.log("These are the producer id", producerIds)


    producerIds.forEach(signalNewConsumerTransport)
  })
}

const createSendTransport = () => {
  // see server's socket.on('createWebRtcTransport', sender?, ...)
  // this is a call from Producer, so sender = true
  socket.emit('createWebRtcTransport', { consumer: false }, ({ params }) => {
    // The server sends back params needed 
    // to create Send Transport on the client side
    if (params.error) {
      console.log(params.error)
      return
    }

    console.log("Params from createSendTransport : ", params)


    // creates a new WebRTC Transport to send media
    // based on the server's producer transport params

    if(!producerTransport){
      producerTransport = device.createSendTransport(params)

      producerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
        try {
          // Signal local DTLS parameters to the server side transport
          // see server's socket.on('transport-connect', ...)
          socket.emit('transport-connect', {
            dtlsParameters,
          }, (alredyExists: boolean) => {
            if (alredyExists) {
              console.log("user alredy exists ", alredyExists);

              return;
            }
          })

          // Tell the transport that parameters were transmitted.
          callback()

        } catch (error: any) {
          errback(error)
        }
      })

      producerTransport.on('produce', async (parameters, callback, errback) => {
        console.log(parameters)

        try {
          // tell the server to create a Producer
          // with the following parameters and produce
          // and expect back a server side producer id
          // see server's socket.on('transport-produce', ...)
          socket.emit('transport-produce', {
            kind: parameters.kind,
            rtpParameters: parameters.rtpParameters,
            appData: parameters.appData,
          }, ({ id, producersExist, alredyExists }) => {
            if (alredyExists) {
              console.log("already produced cannot produce again");
              return;
            }
            // Tell the transport that parameters were transmitted and provide it with the
            // server side producer's id.
            callback({ id })

            // if producers exist, then join room
            if (producersExist) getProducers()
          })

        } catch (error: any) {
          errback(error)
        }
      })
    }
    
  })
}

export default createSendTransport
export { producerTransport ,getProducers }
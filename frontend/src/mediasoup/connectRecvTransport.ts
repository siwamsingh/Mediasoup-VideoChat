import { Transport } from "mediasoup-client/lib/types"
import socket from "../socket"
import { device } from "./allExports"
import { videoContainerRef } from "../components/video/Video2";

let consumerTransports: Array<any> = [];

const connectRecvTransport = async (consumerTransport: Transport, remoteProducerId: string, serverConsumerTransportId: string) => {
  // for consumer, we need to tell the server first
  // to create a consumer based on the rtpCapabilities and consume
  // if the router can consume, it will send back a set of params as below
  socket.emit('consume', {
    rtpCapabilities: device.rtpCapabilities,
    remoteProducerId,
    serverConsumerTransportId,
  }, async ({ params }) => {
    if (params.error) {
      console.log('Cannot Consume')
      return
    }

    console.log(`Consumer Params ${params}`)
    // then consume with the local consumer transport
    // which creates a consumer
    const consumer = await consumerTransport.consume({
      id: params.id,
      producerId: params.producerId,
      kind: params.kind,
      rtpParameters: params.rtpParameters
    })

    consumerTransports = [
      ...consumerTransports,
      {
        consumerTransport,
        serverConsumerTransportId: params.id,
        producerId: remoteProducerId,
        consumer,
      },
    ]

    // create a new div element for the new consumer media
    const newElem = document.createElement('div');
newElem.setAttribute('id', `td-${remoteProducerId}`);

if (params.kind === 'audio') {
  // Append to the audio container
  const audioElem = document.createElement('audio');
  audioElem.setAttribute('id', remoteProducerId);
  audioElem.setAttribute('autoplay', 'true');
  audioElem.setAttribute('class', 'audio'); // Add any Tailwind classes if needed
  
  newElem.appendChild(audioElem);
} else {
  // Append to the video container
  newElem.setAttribute('class', 'bg-gray-700 w-[50%] sm:w-[33%] sm:h-[50%] relative rounded-md border border-gray-600');
  
  const videoElem = document.createElement('video');
  videoElem.setAttribute('id', remoteProducerId);
  // videoElem.setAttribute('muted','true');// mute for autostart in some browsers this doesnt work
  videoElem.setAttribute('autoplay', 'true');
  videoElem.setAttribute('class', 'w-full h-full object-contain rounded-lg border border-gray-600');
  
  newElem.appendChild(videoElem);
}

// Append to the video container
if (videoContainerRef.current) {
  videoContainerRef.current.appendChild(newElem);
} else {
  console.error('videoContainerRef is null');
}

    // destructure and retrieve the video track from the producer
    const { track } = consumer

    const mediaElement = document.getElementById(remoteProducerId);
    if (mediaElement) {
      (mediaElement as HTMLMediaElement).srcObject = new MediaStream([track]);
    }
    // the server consumer started with media paused
    // so we need to inform the server to resume
    socket.emit('consumer-resume', { serverConsumerId: params.serverConsumerId })
  })
}

socket.on('producer-closed', ({ remoteProducerId }: {remoteProducerId:string}) => {
  // server notification is received when a producer is closed
  // we need to close the client-side consumer and associated transport
  const producerToClose = consumerTransports.find(transportData => transportData.producerId === remoteProducerId)
  producerToClose.consumerTransport.close()
  producerToClose.consumer.close()

  // remove the consumer transport from the list
  consumerTransports = consumerTransports.filter(transportData => transportData.producerId !== remoteProducerId)


  const elementToRemove = document.getElementById(`td-${remoteProducerId}`);
    
    // Check if both videoContainerRef and elementToRemove are not null before removing the element
    if (videoContainerRef.current && elementToRemove) {
      videoContainerRef.current.removeChild(elementToRemove);
    } else {
      console.error('Element or container not found');
    }
})

export default connectRecvTransport
export {consumerTransports}
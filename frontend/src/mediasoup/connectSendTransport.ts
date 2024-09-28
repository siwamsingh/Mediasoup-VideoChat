import socket from "../socket";
import { audioParams, videoParams } from "./allExports";
import { producerTransport } from "./allExports";

let audioProducer, videoProducer;

const checkVideoExists = (): Promise<boolean> => {
  return new Promise((resolve) => {
    socket.emit('check-video-exists', ({ alreadyExists }) => {
      resolve(alreadyExists);
    });
  });
};
const checkAudioExists = (): Promise<boolean> => {
  return new Promise((resolve) => {
    socket.emit('check-audio-exists', ({ alreadyExists }) => {
      resolve(alreadyExists);
    });
  });
};

const connectSendTransport = async (type: string) => {
  // we now call produce() to instruct the producer transport
  // to send media to the Router
  // https://mediasoup.org/documentation/v3/mediasoup-client/api/#transport-produce
  // this action will trigger the 'connect' and 'produce' events above


  if (type === 'video') {
    const videoProducerExists = await checkVideoExists();

    if (videoProducerExists) {
      console.log("video produce already exists");
      return; 
    }

    videoProducer = await producerTransport.produce(videoParams);

    videoProducer.on('trackended', () => {
      console.log('video track ended')

      // close video track
    })

    videoProducer.on('transportclose', () => {
      console.log('video transport ended')

      // close video track
    })

    socket.emit("set-already-exists",type)

  } else {

    const audioProducerExists = await checkAudioExists();

    if (audioProducerExists) {
      console.log("audio produce already exists");
      return; 
    }

    audioProducer = await producerTransport.produce(audioParams);

    audioProducer.on('trackended', () => {
      console.log('audio track ended')

      // close audio track
    })

    audioProducer.on('transportclose', () => {
      console.log('audio transport ended')

      // close audio track
    })
    
    socket.emit("set-already-exists",type)
  }

}

export default connectSendTransport
export {audioProducer, videoProducer }
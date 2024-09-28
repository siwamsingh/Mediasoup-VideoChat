import params from './params';
import {connectSendTransport , producerTransport} from './allExports';

import { RefObject } from 'react';

let audioParams: object= {};
let videoParams: object= {params};

const getLocalStream = (videoRef: RefObject<HTMLVideoElement>,type: string) => {
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {
      width: {
        min: 640,
        max: 1920,
      },
      height: {
        min: 400,
        max: 1080,
      }
    }
  })
  .then((stream) => streamSuccess(stream, videoRef , type ))
  .catch((error: DOMException) => {
    console.log(error);
  });
};

const streamSuccess = (stream: MediaStream, videoRef: RefObject<HTMLVideoElement> , type: string) => {
  if (videoRef.current && type==='video') {
    videoRef.current.srcObject = stream;
    videoRef.current.muted = true;
  }


  audioParams = { track: stream.getAudioTracks()[0], ...audioParams };
  videoParams = { track: stream.getVideoTracks()[0], ...videoParams };
  


  if(producerTransport) connectSendTransport(type);
  
};

export default getLocalStream;
export {videoParams,audioParams}

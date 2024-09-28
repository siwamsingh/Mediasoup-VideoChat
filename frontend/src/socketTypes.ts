
export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  'producer-closed': (data: { remoteProducerId: string }) => void;
  'new-producer': (data: { producerId: string })=>void;
}

export interface ClientToServerEvents {
  hello: () => void;
  joinRoom: (d: object, callback: (e: {rtpCapabilities: object}) => void) => void;
  createWebRtcTransport: (d: object, callback: (e: {params: any}) => void) => void;
  "transport-connect": (d: object, callback: (e: boolean) => void) => void;
  "transport-produce": (d: object, callback: (e: {id: any , producersExist: any , alredyExists: boolean}) => void) => void;
  getProducers: (callback: (e: any) => void) => void;
  'transport-recv-connect' : (d: object) => void;
  consume: (e: object, callback: ({params}: {params: any})=>void)=>void;
  'consumer-resume': (d: object) => void;  
  'set-already-exists': (type: string) => void;
  'check-video-exists': (callback: ({alreadyExists}: {alreadyExists:boolean})=>void) => void;
  'check-audio-exists': (callback: ({alreadyExists}: {alreadyExists:boolean})=>void) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

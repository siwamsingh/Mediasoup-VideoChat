import { io, Socket } from "socket.io-client";
import { ServerToClientEvents , ClientToServerEvents } from "./socketTypes";

// please note that the types are reversed
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3000/mediasoup");


export default socket;

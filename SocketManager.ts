import io from "socket.io-client";

import { Socket } from "socket.io-client";

let socket: Socket;

const initSocket = (): Socket => {
  socket = io("http://192.168.100.17:8000");
  return socket;
};

const getSocket = (): Socket => {
  if (!socket) {
    throw new Error("Call init first");
  }
  return socket;
};

const socketSingleton = {
  initSocket,
  getSocket,
};

export default socketSingleton;


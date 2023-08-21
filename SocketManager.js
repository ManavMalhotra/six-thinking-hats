import { io } from "socket.io-client";

const url = "http://192.168.100.17:8000/";

const socket = io(url);

const createRoom = (data) => {
  socket.emit("createRoom", data);
};

export const SocketManager = {
  getSocket: () => socket,
  createRoom,
};
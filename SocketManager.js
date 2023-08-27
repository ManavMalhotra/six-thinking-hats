import io from "socket.io-client";

let socket;

const initSocket = () => {
  socket = io("http://192.168.100.17:8000");
  return socket;
};

const getSocket = () => {
  if (!socket) {
    // throw new Error("Call init first");
    socket = io("http://192.168.100.17:8000");
  }
  console.log("socket from socket manager: ", socket);
  return socket;
};
const socketSingleton = {
    initSocket,
    getSocket,
  };
  
export default socketSingleton;

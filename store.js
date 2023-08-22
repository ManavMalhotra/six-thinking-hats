import { create } from "zustand";
import io from "socket.io-client";

const useSocketStore = create((set) => ({
  socket: null,
  userId: null,
  isAdmin: null,
  hatColor: null,
  roomId: null,
  mySession: [],

  connect: () => {
    const socket = io("http://192.168.100.17:8000/");
    set({ socket });
    set({ userId: socket.id });
    console.log("socket id: ", socket.id);
  },

  disconnect: () => {
    const socket = useSocketStore.getState().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },

  setuserId: (userId) => set({ userId }),
  setAdmin: (isAdmin) => set({ isAdmin }),
  setHatColor: (hatColor) => set({ hatColor }),
  setroomId: (roomId) => set({ roomId }),
  setMySession: (newSession) => set({ mySession: newSession }),


}));

export default useSocketStore;

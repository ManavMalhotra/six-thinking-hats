import { create } from "zustand";
import io from "socket.io-client";

const useSocketStore = create((set) => ({
  socket: null,
  userId: null,
  isAdmin: false,
  hatColor: null,
  roomId: null,
  mySession: [],

  setSocket: (newSocket) => set((state) => ({ socket: newSocket })),
  setUserId: (userId) => set({ userId }),
  setAdmin: (isAdmin) => set({ isAdmin }),
  setHatColor: (hatColor) => set({ hatColor }),
  setroomId: (roomId) => set({ roomId }),
  setMySession: (newSession) => set({ mySession: newSession }),
}));

const useUserStore = create((set) => ({
  userName: "",
  userOrganisation: "",
  userRole: "",
  userProfilePic: null,

  setUserName: (userName) => set({ userName }),
  setUserOrganisation: (userOrganisation) => set({ userOrganisation }),
  setUserRole: (userRole) => set({ userRole }),
  setUserProfilePic: (userProfilePic) => set({ userProfilePic }),
}));

export { useSocketStore, useUserStore };

import { create } from "zustand";
import io from "socket.io-client";

const useSocketStore = create((set) => ({
  socket: null,
  userId: "",
  isAdmin: false,
  hatColor: "",
  roomId: "",
  mySession: [],

  setSocket: (newSocket) => set((state) => ({ socket: newSocket })),
  setUserId: (userId: String) => set({ userId }),
  setAdmin: (isAdmin: Boolean) => set({ isAdmin }),
  setHatColor: (hatColor: String) => set({ hatColor }),
  setroomId: (roomId: String) => set({ roomId }),
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

import { create } from "zustand";


const useStore = create((set) => ({

  selectedHotel: null,
  setSelectedHotel: (hotel) => set({ selectedHotel: hotel }), 

  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
}));

export default useStore;

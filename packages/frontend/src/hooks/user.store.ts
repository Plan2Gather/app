import { create } from 'zustand';
import { nanoid } from 'nanoid';

interface UserStore {
  userId: string;
  getUserId: () => string;
}

function getUserId() {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = nanoid();
    localStorage.setItem('userId', userId);
  }
  return userId;
}

const useUserStore = create<UserStore>((_, get) => ({
  userId: getUserId(),
  getUserId: () => get().userId,
}));

export default useUserStore;

import { nanoid } from 'nanoid';
import { create } from 'zustand';

interface UserStore {
  userId: string;
  getUserId: () => string;
}

function getUserId() {
  let userId = localStorage.getItem('userId');
  if (userId == null) {
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

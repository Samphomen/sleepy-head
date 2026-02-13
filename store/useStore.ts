import { create } from 'zustand';

interface AppState {
    isUnlocked: boolean;
    setIsUnlocked: (value: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
    isUnlocked: false,
    setIsUnlocked: (value) => set({ isUnlocked: value }),
}));

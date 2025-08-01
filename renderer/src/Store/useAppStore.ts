import { create } from 'zustand';

interface AppState {
  gamePath: string | null;
  showGamePathModal: boolean;
  setGamePath: (path: string) => void;
  dismissModal: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  gamePath: null,
  showGamePathModal: true,

  setGamePath: (path) => set(() => ({
    gamePath: path,
    showGamePathModal: false,
  })),

  dismissModal: () => set(() => ({
    showGamePathModal: false
  }))
}));

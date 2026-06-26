import { create } from 'zustand';

type Role = 'student' | 'tutor' | 'consultant' | 'resource-creator' | 'academy';

interface AppState {
  role: Role;
  setRole: (role: Role) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  onboardingComplete: boolean;
  setOnboardingComplete: (complete: boolean) => void;
  isPro: boolean;
  setIsPro: (val: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  role: 'student',
  setRole: (role) => set({ role }),
  darkMode: typeof window !== 'undefined' ? localStorage.getItem('theme') === 'dark' : false,
  toggleDarkMode: () => set((state) => {
    const newDarkMode = !state.darkMode;
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    return { darkMode: newDarkMode };
  }),
  onboardingComplete: false,
  setOnboardingComplete: (complete) => set({ onboardingComplete: complete }),
  isPro: false,
  setIsPro: (isPro) => set({ isPro }),
}));

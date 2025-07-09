import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DecisionState {
  choices: string[];
  result: string | null;
  addChoice: (choice: string) => void;
  removeChoice: (index: number) => void;
  updateChoice: (index: number, newValue: string) => void;
  makeDecision: () => void;
  clearResult: () => void;
  resetChoices: () => void;
}

export const useDecisionStore = create<DecisionState>()(
  persist(
    (set, get) => ({
      choices: ['', ''],
      result: null,
      
      addChoice: (choice) => set((state) => ({
        choices: [...state.choices, choice]
      })),
      
      removeChoice: (index) => set((state) => ({
        choices: state.choices.filter((_, i) => i !== index)
      })),
      
      updateChoice: (index, newValue) => set((state) => {
        const updatedChoices = [...state.choices];
        updatedChoices[index] = newValue;
        return { choices: updatedChoices };
      }),
      
      makeDecision: () => {
        const { choices } = get();
        const validChoices = choices.filter(choice => choice.trim() !== '');
        
        if (validChoices.length > 0) {
          const randomIndex = Math.floor(Math.random() * validChoices.length);
          set({ result: validChoices[randomIndex] });
        } else {
          set({ result: null });
        }
      },
      
      clearResult: () => set({ result: null }),
      
      resetChoices: () => set({ choices: ['', ''] }),
    }),
    {
      name: 'decision-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
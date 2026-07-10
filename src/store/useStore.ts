import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type StoreState = {
  bookmarkedNotes: string[];
  completedQuizzes: string[];
  studyStreak: number;
  toggleBookmark: (noteId: string) => void;
  markQuizCompleted: (quizId: string) => void;
  incrementStreak: () => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      bookmarkedNotes: [],
      completedQuizzes: [],
      studyStreak: 14, // Mock initial streak

      toggleBookmark: (noteId) =>
        set((state) => ({
          bookmarkedNotes: state.bookmarkedNotes.includes(noteId)
            ? state.bookmarkedNotes.filter((id) => id !== noteId)
            : [...state.bookmarkedNotes, noteId],
        })),

      markQuizCompleted: (quizId) =>
        set((state) => ({
          completedQuizzes: state.completedQuizzes.includes(quizId)
            ? state.completedQuizzes
            : [...state.completedQuizzes, quizId],
        })),

      incrementStreak: () =>
        set((state) => ({ studyStreak: state.studyStreak + 1 })),
    }),
    {
      name: 'codeverse-storage',
    }
  )
);

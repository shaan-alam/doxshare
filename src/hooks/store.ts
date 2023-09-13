import { create } from "zustand";

type EditorStore = {
  content: string;
};

type EditorActions = {
  updateEditor: (value: EditorStore["content"]) => void;
};

export const useEditor = create<EditorStore & EditorActions>((set) => ({
  content: "",
  updateEditor: (value: string) => set((state) => ({ content: value })),
}));

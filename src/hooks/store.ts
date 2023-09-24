import { create } from "zustand";
import { type JSONContent } from "@tiptap/react";

type EditorStore = {
  content: string;
};

type EditorActions = {
  updateEditor: (value: EditorStore["content"]) => void;
};

export const useEditor = create<EditorStore & EditorActions>((set) => ({
  content: "",
  updateEditor: (value: EditorStore["content"]) =>
    set((state) => ({ content: value })),
}));

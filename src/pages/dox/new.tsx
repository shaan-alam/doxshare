"use client";
import { useEffect } from "react";
import type { NextPage } from "next";
import { Editor } from "novel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ControlSidebar } from "@/components";
import { useEditor } from "@/hooks/store";

const NewDox = () => {
  const [editorContent, updateEditorContent] = useEditor((state) => [
    state.content,
    state.updateEditor,
  ]);

  return (
    <section className="flex h-screen">
      <ScrollArea className="bg-[hsl(240 10% 3.9%)] h-screen w-3/4 p-4 text-primary">
        <Editor
          className="[& .tiptap>*]:my-1 w-full dark:bg-inherit"
          defaultValue={editorContent}
          onUpdate={(editor) => {
            localStorage.setItem(
              "novel_content",
              JSON.stringify(editor?.getHTML()),
            );
            updateEditorContent(editor?.getHTML() as string);
          }}
        />
      </ScrollArea>
      <ControlSidebar />
    </section>
  );
};

export default NewDox;

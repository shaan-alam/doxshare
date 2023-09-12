import type { NextPage } from "next";
import { Editor } from "novel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ControlSidebar } from "@/components";

const NewDox: NextPage = () => {
  return (
    <section className="flex h-screen">
      <ScrollArea className="bg-[hsl(240 10% 3.9%)] h-screen w-3/4 p-4 text-primary">
        <Editor className="w-full dark:bg-inherit [& .tiptap>*]:my-1" />
      </ScrollArea>
      <ControlSidebar />
    </section>
  );
};

export default NewDox;

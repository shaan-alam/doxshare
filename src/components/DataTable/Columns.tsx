"use client";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export type Dox = Prisma.DoxGetPayload<{
  select: {
    id: true;
    expiration: true;
    exposure: true;
    title: true;
    isPasswordProtected: true;
  };
}>;

export const columns: ColumnDef<Dox>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "exposure",
    header: "Exposure",
  },
  {
    accessorKey: "isPasswordProtected",
    header: "Password Protected",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const dox = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/dox/edit/${dox.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                Edit
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="my-1 cursor-pointer bg-destructive text-destructive-foreground">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

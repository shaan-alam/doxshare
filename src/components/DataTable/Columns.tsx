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
import { Lock, MoreHorizontal, Unlock } from "lucide-react";
import Link from "next/link";

export type Dox = Prisma.DoxGetPayload<{
  select: {
    id: true;
    expiration: true;
    exposure: true;
    title: true;
    isPasswordProtected: true;
    createdAt: true;
  };
}>;

export const columns: ColumnDef<Dox>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const dox = row.original;

      return (
        <Link href={`/view/${dox.id}`} className="hover:underline">
          {dox.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "exposure",
    header: "Exposure",
    cell: ({ row }) => {
      const dox = row.original;

      return dox.exposure.charAt(0).toUpperCase() + dox.exposure.substring(1);
    },
  },
  {
    accessorKey: "expiration",
    header: "Expiration",
    cell: ({ row }) => {
      const dox = row.original;

      if (
        new Date().getMilliseconds() >
        dox.createdAt.getMilliseconds() + Number(dox.expiration)
      ) {
        return <span className="text-red-500">Expired</span>;
      } else {
        return <span className="text-green-500">Not Expired</span>;
      }
    },
  },
  {
    accessorKey: "isPasswordProtected",
    header: "Password Protected",
    cell: ({ row }) => {
      const dox = row.original;

      return dox.isPasswordProtected ? (
        <Lock className="h-4 w-4 text-green-500" />
      ) : (
        <Unlock className="h-4 w-4 text-red-500" />
      );
    },
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

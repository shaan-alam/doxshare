"use client";
import { useState } from "react";
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

import { Loader2, Lock, MoreHorizontal, Unlock } from "lucide-react";
import Link from "next/link";
import { api } from "@/utils/api";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useToast } from "../ui/use-toast";

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
        <Link href={`/edit/${dox.id}`} className="hover:underline">
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

      if (!dox.expiration) {
        return <span className="text-blue-500">Never Expires</span>;
      }

      console.log(
        "current time ",
        new Date().getTime(),
        " expiration time ",
        new Date(Number(dox.expiration)).getTime(),
      );

      if (new Date().getTime() > new Date(Number(dox.expiration)).getTime()) {
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
        <span className="flex items-center text-green-500">
          <Lock className="h-4 w-4" />
          &nbsp;Protected
        </span>
      ) : (
        <span className="flex items-center text-red-500">
          <Unlock className="h-4 w-4" />
          &nbsp;Not Protected
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { toast } = useToast();
      const trpcUtils = api.useContext();
      const dox = row.original;
      const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
      const { mutate, isLoading } = api.dox.deleteDox.useMutation({
        onSuccess: () => {
          trpcUtils.invalidate();
          setDeleteDialogOpen(false);
          toast({
            title: "Deleted!",
            description: "Your dox has been successfully deleted!!",
          });
        },
      });

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`/dox/edit/${dox.id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  Edit
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                disabled={isLoading}
                className="cursor-pointer"
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={(res) => setDeleteDialogOpen(res)}
          >
            <AlertDialogTrigger></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your dox and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  className="flex items-center bg-destructive text-white hover:bg-destructive"
                  onClick={() => mutate({ id: dox.id })}
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? "Deleting..." : "Continue"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];

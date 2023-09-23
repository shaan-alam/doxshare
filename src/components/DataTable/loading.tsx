import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";

export const DataTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[500px]">
            <Skeleton className="h-[13px]" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-[13px]" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-[13px]" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-[13px]" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Skeleton className="h-[13px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[13px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[13px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[13px]" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className="h-[13px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[13px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[13px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[13px]" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className="h-[13px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[13px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[13px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[13px]" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

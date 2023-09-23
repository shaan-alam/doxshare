import { DataTable } from "./data-table";
import { type Dox, columns } from "./Columns";
import { api } from "@/utils/api";
import { DataTableSkeleton } from "./loading";

const DoxTable = () => {
  const { isLoading, data } = api.dox.getAllDox.useQuery();

  return (
    <div className="container mx-auto py-10">
      {isLoading && <DataTableSkeleton />}
      {data && (
        <>
          <h1 className='font-bold text-3xl my-4'>Your Dox</h1>
          <DataTable columns={columns} data={data?.doxes as Dox[]} />
        </>
      )}
    </div>
  );
};

export default DoxTable;

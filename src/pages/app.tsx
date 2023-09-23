import { Sidebar } from "@/components";
import DoxTable from "@/components/DataTable";
import { api } from "@/utils/api";

const Home = () => {
  const { isLoading, data } = api.dox.getAllDox.useQuery();

  return (
    <main className="flex">
      <Sidebar />
      <div className="w-[80%]">
        <DoxTable />
      </div>
    </main>
  );
};

export default Home;

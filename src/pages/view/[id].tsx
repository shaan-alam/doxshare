import { api } from "@/utils/api";
import { Loader2 } from "lucide-react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "@/styles/dox.module.scss";

const ViewDox: NextPage = () => {
  const router = useRouter();
  const id = router.query["id"] as string;

  const { isLoading, data } = api.dox.getDox.useQuery(
    { id },
    {
      onSuccess: console.log
    },
  );

  return (
    <section className="h-auto w-full">
      <div className="mx-auto w-[60%] p-8">
        {isLoading && (
          <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}
        {!isLoading && data && (
          <div className={styles["dox-view-container"]}>
            <div
              className="h-screen"
              dangerouslySetInnerHTML={{ __html: data?.dox?.content as string }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ViewDox;

import { DataTable } from "@/components/ui/datatable";
import { columns } from "@/components/ui/datatable/columns";
import useData from "@/context/media";
import data from "@/data/tasks.json";

export default function Media() {
  const { media } = useData();
  return (
    <>
      <div className="px-5 text-xs">
        <DataTable
          data={media?.sort((a: any, b: any) => b?.date - a?.date)}
          columns={columns}
        />
      </div>
    </>
  );
}

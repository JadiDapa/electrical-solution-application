import DashboardHeader from "@/components/pages/Dashboard/DashboardHeader";
import UnitHandlerTable from "@/components/pages/Dashboard/Projects/UnitHandler/UnitHandlerTabel";
import UserTable from "@/components/pages/Dashboard/UserTable";
import { unitHandlerColumn } from "@/lib/column/unit-handler-column";
import { userColumn } from "@/lib/column/user-column";
import { getAllUsers } from "@/lib/network/user";
import { BarChart2 } from "lucide-react";

export default async function ProjectUnitHandler({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const users = await getAllUsers();
  const units = users.filter(
    (user) => user.role === "unit" || user.role === "admin",
  );

  return (
    <section className="flex w-full flex-col gap-4 lg:gap-6">
      {/* Header Title */}
      <DashboardHeader title="Project" subtitle="Unit Handler" />

      <UnitHandlerTable
        columns={unitHandlerColumn}
        data={units}
        total={users.length}
      />
    </section>
  );
}

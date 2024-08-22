"use client";

import DashboardHeader from "@/components/pages/Dashboard/DashboardHeader";
import UnitHandlerTable from "@/components/pages/Dashboard/Projects/UnitHandler/UnitHandlerTabel";
import { unitHandlerColumn } from "@/lib/column/unit-handler-column";
import { getAllUsers } from "@/lib/network/user";
import { useQuery } from "@tanstack/react-query";

export default function ProjectUnitHandler() {
  const { data: users } = useQuery({
    queryFn: () => getAllUsers(),
    queryKey: ["users"],
  });

  const units = users?.filter(
    (user) => user.role === "unit" || user.role === "admin",
  );

  if (units && users) {
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
}

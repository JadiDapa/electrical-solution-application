"use client";

import DashboardHeader from "@/components/pages/Dashboard/DashboardHeader";
import { getAllAssements } from "@/lib/network/assement";
import AssementTable from "@/components/pages/Dashboard/Assements/AssementTable";
import { assementColumn } from "@/lib/column/assement-column";
import { useQuery } from "@tanstack/react-query";

export default function AssetManagemenAdminDashboard() {
  const { data: assements } = useQuery({
    queryFn: () => getAllAssements(),
    queryKey: ["assements"],
  });

  if (assements) {
    return (
      <section className="flex w-full flex-col gap-4 lg:gap-6">
        {/* Header Title */}
        <DashboardHeader title="Your Projects" subtitle="Asset Management" />

        <AssementTable
          columns={assementColumn}
          data={assements}
          total={assements.length}
        />
      </section>
    );
  }
}

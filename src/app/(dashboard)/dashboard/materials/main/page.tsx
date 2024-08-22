"use client";

import MaterialTable from "@/components/pages/Dashboard/Material/MaterialTable";
import { materialColumn } from "@/lib/column/material-column";
import { getAllMaterials } from "@/lib/network/material";
import { useQuery } from "@tanstack/react-query";
import { BarChart2 } from "lucide-react";

export default function MaterialMain() {
  const { data: materials } = useQuery({
    queryFn: () => getAllMaterials(),
    queryKey: ["materials"],
  });

  if (materials) {
    return (
      <section className="flex w-full flex-col gap-4 py-6 lg:gap-6">
        {/* Header Title */}
        <div className="flex gap-1 text-2xl capitalize">
          Materials /<span> Main</span>
        </div>
        {/* Data Statistic */}
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
          <div className="box-shadow flex flex-[1] flex-col items-center justify-center gap-2 rounded-md bg-white p-6">
            <div className="relative grid aspect-square w-52 place-items-center rounded-full bg-primary">
              <div className="flex aspect-square w-44 flex-col items-center justify-center gap-2 rounded-full bg-white">
                <p className="text-4xl font-bold text-primary">
                  {materials?.length}
                </p>
                <p className="flex gap-1 text-xl font-medium text-foreground">
                  <BarChart2 />
                  Total Data
                </p>
              </div>
            </div>
          </div>

          {/* <div className="box-shadow max-h-fit w-full flex-[3] justify-between rounded-md bg-white px-6 pt-6">
          <WeeklyChart
            chartData={remapData(guests || []).slice(-10)}
            title="Tamu 10 data terakhir"
            label="Tamu"
          />
        </div> */}
        </div>
        <MaterialTable
          columns={materialColumn}
          data={materials}
          total={materials.length}
        />
      </section>
    );
  }
}

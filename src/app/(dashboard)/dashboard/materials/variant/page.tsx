"use client";

import MaterialVariantTable from "@/components/pages/Dashboard/Material/Variant/MaterialVariantTable";
import { materialVariantColumn } from "@/lib/column/material-variant-column";
import { getAllMaterialVariants } from "@/lib/network/material-variant";
import { useQuery } from "@tanstack/react-query";
import { BarChart2 } from "lucide-react";

export default function MaterialVariant() {
  const { data: materialVariants } = useQuery({
    queryFn: () => getAllMaterialVariants(),
    queryKey: ["material-variants"],
  });

  if (materialVariants) {
    return (
      <section className="flex w-full flex-col gap-4 py-6 lg:gap-6">
        {/* Header Title */}
        <div className="flex gap-1 text-2xl capitalize">
          Materials /<span> Variants</span>
        </div>
        {/* Data Statistic */}
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
          <div className="box-shadow flex flex-[1] flex-col items-center justify-center gap-2 rounded-md bg-white p-6">
            <div className="relative grid aspect-square w-52 place-items-center rounded-full bg-primary">
              <div className="flex aspect-square w-44 flex-col items-center justify-center gap-2 rounded-full bg-white">
                <p className="text-4xl font-bold text-primary">
                  {materialVariants?.length}
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
        <MaterialVariantTable
          columns={materialVariantColumn}
          data={materialVariants}
          total={materialVariants.length}
        />
      </section>
    );
  }
}

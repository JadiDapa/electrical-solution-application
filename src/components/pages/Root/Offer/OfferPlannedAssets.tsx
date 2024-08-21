import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMaterialCalculationsByProjectId } from "@/lib/network/material-calculation";
import { cn } from "@/lib/utils";
import { MaterialCalculationType } from "@/lib/type/material-calculation";

interface OfferPlannedAssets {
  projectId: string;
}

export interface RemapMaterialType {
  material: string;
  variant: {
    calculationId: string;
    name: string;
    price: number;
    quantity: number;
    status: string;
  }[];
}

export default function OfferPlannedAssets({ projectId }: OfferPlannedAssets) {
  const { data: materialCalculations } = useQuery({
    queryFn: () => getMaterialCalculationsByProjectId(projectId),
    queryKey: ["material-calculations", projectId],
  });

  const result: { [key: string]: RemapMaterialType } = {};

  materialCalculations?.forEach((item: MaterialCalculationType) => {
    const { id, MaterialVariant, quantity, status } = item;
    const { Material, name, price } = MaterialVariant;

    if (!result[Material.name]) {
      result[Material.name] = {
        material: Material.name,
        variant: [],
      };
    }

    result[Material.name].variant.push({
      calculationId: id,
      name: name,
      price: parseInt(price),
      quantity: quantity,
      status: status as string,
    });
  });

  const remapMaterial: RemapMaterialType[] = Object.values(result);

  const totalPrice =
    materialCalculations?.reduce((sum, item) => {
      return sum + item.quantity * parseFloat(item.MaterialVariant.price);
    }, 0) || 0;

  return (
    <ScrollArea className="flex-[1] rounded-xl bg-white px-3 py-5">
      <div className="flex items-start justify-between">
        <h2 className="text-center text-xl font-semibold text-primary">
          Planned Assets
        </h2>
        <div className="text-end">
          <p>Total</p>
          <p className="font-bold">Rp {totalPrice.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-3 divide-y">
        {remapMaterial?.map((material) => (
          <div key={material.material} className="py-2">
            <h4 className="font-semibold">{material.material}</h4>
            <div className="mt-2 space-y-1 ps-2">
              {material.variant.map((variant) => (
                <div key={variant.calculationId} className="flex gap-3">
                  <div className="flex flex-[3] gap-1">
                    - <p className={cn("text-sm")}>{variant.name}</p>
                  </div>

                  <div className="flex flex-[2] gap-1">
                    <p className="text-sm">
                      Rp {(variant.price * variant.quantity).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-[1] gap-1">
                    <p className="text-sm">Vol: {variant.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

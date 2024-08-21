import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ComponentCard from "./ComponentCard";
import ComponentVariant from "./ComponentVariant";
import { getAllMaterials } from "@/lib/network/material";
import { getMaterialCalculationsByProjectId } from "@/lib/network/material-calculation";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ChevronRightCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getOfferByProjectId } from "@/lib/network/offer";
import MaterialItem from "../Drawing/Konva/Shapes/MaterialItem";
import { RemapMaterialType } from "../Offer/OfferPlannedAssets";
import { OfferType } from "@/lib/type/offer";
import { MaterialCalculationType } from "@/lib/type/material-calculation";
import { MaterialType } from "@/lib/type/material";

interface CalculationSelectionProps {
  projectId: string;
}

export default function CalculationSelection({
  projectId,
}: CalculationSelectionProps) {
  const { data: materials } = useQuery<MaterialType[]>({
    queryFn: getAllMaterials,
    queryKey: ["materials"],
  });

  const { data: materialCalculations } = useQuery<MaterialCalculationType[]>({
    queryFn: () => getMaterialCalculationsByProjectId(projectId),
    queryKey: ["material-calculations", projectId],
  });

  const { data: offer } = useQuery<OfferType>({
    queryFn: () => getOfferByProjectId(projectId),
    queryKey: ["offer", projectId],
  });

  const result: { [key: string]: RemapMaterialType } = {};

  materialCalculations?.forEach((item) => {
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

  const totalPaid =
    materialCalculations
      ?.filter((item) => item.status === "true")
      .reduce((sum, item) => {
        return sum + item.quantity * parseFloat(item.MaterialVariant.price);
      }, 0) || 0;

  const progressPercentage = Math.round((totalPaid / totalPrice) * 100);

  return (
    <section
      id="calculation-selection"
      className="relative items-center gap-12 space-y-6 bg-primary/5 px-9 py-6 lg:px-24"
    >
      <h2 className="border-l-8 border-primary ps-3 text-4xl font-semibold">
        Pemilihan Komponen
      </h2>
      <div className="flex gap-6">
        <div className="flex-[2] space-y-3 rounded-xl bg-white px-6 py-9">
          <Accordion type="single" collapsible className="w-full">
            {materials?.map((item) => (
              <AccordionItem key={item.name} value={item.name}>
                <AccordionTrigger>
                  <ComponentCard
                    title={item.name}
                    image={item.image}
                    totalVariant={item.MaterialVariant.length}
                  />
                </AccordionTrigger>
                <AccordionContent className="divide-y border-t py-1">
                  <div className="flex items-center py-2">
                    <p className="flex-[4] font-semibold">Varian Komponen</p>
                    <p className="flex-[2] font-semibold">Harga</p>
                    <p className="flex-[1] pe-1 text-end font-semibold">
                      Kuantitas
                    </p>
                  </div>
                  {item.MaterialVariant.map((variant) => (
                    <ComponentVariant
                      key={variant.id}
                      variantId={variant.id}
                      projectId={projectId}
                      title={variant.name}
                      price={variant.price}
                      calculationId={
                        materialCalculations?.find(
                          (material) =>
                            material.materialVariantId === variant.id,
                        )?.id
                      }
                      quantity={
                        materialCalculations?.find(
                          (material) =>
                            material.materialVariantId === variant.id,
                        )?.quantity
                      }
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <ScrollArea className="flex-[1] rounded-xl rounded-s-md bg-white px-3 py-5">
          <h2 className="text-center text-xl font-semibold text-primary">
            Project Overview
          </h2>
          <h3 className="mt-3 text-sm font-semibold">Project Progress</h3>
          <div className="relative">
            <Progress value={progressPercentage} className="mt-1" />
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm font-semibold text-white">
              {progressPercentage}%
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="">
              <p className="font-bold">Total</p>
              <p>Rp {totalPrice.toLocaleString()}</p>
            </div>
            <div className="">
              <p className="font-bold">Paid</p>
              <p>Rp {totalPaid.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Material Listed</h3>
          </div>

          <div className="mt-3 flex flex-col gap-3 divide-y">
            {remapMaterial?.map((material) => (
              <MaterialItem
                key={material.material}
                mainMaterial={material.material}
                materialVariants={material.variant}
              />
            ))}
          </div>
          <Separator className="mt-6" />
          {offer ? (
            <Link
              href={`/invoice/build-electrical-installation/${projectId}`}
              className="mt-4 flex justify-between"
            >
              <Button className="flex items-center gap-3">
                See Project Offer <Eye className="size-5" />
              </Button>
              <p className="w-64 text-end">Check created project offer</p>
            </Link>
          ) : (
            <Link
              href={`/offer/${projectId}`}
              className="mt-4 flex justify-between"
            >
              <Button className="flex items-center gap-3">
                Create Offer <ChevronRightCircle className="size-5" />
              </Button>
              <p className="max-w-32 text-end">
                Make sure your material plans before continue
              </p>
            </Link>
          )}
        </ScrollArea>
      </div>
    </section>
  );
}

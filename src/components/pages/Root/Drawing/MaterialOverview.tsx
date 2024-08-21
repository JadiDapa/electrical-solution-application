"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllMaterials } from "@/lib/network/material";
import { getMaterialCalculationsByProjectId } from "@/lib/network/material-calculation";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  ChevronRightCircle,
  Eye,
  Plus,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import AddMaterialModal from "./AddMaterialModal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { RotatingLines } from "react-loader-spinner";
import MaterialItem from "./Konva/Shapes/MaterialItem";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { getOfferByProjectId } from "@/lib/network/offer";
import { MaterialCalculationType } from "@/lib/type/material-calculation";

interface ResultType {
  [key: string]: {
    material: string;
    variant: {
      calculationId: string;
      name: string;
      price: number;
      quantity: number;
      status: string;
    }[];
  };
}

export default function MaterialOverview() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const params = useParams();
  const projectId = params.projectId as string;

  const [isOpen, setIsOpen] = useState(false);
  const { data: materials } = useQuery({
    queryFn: getAllMaterials,
    queryKey: ["materials"],
  });

  const { data: offer } = useQuery({
    queryFn: () => getOfferByProjectId(projectId),
    queryKey: ["offer", projectId],
  });

  const { data: materialCalculations } = useQuery({
    queryFn: async () => {
      if (projectId) {
        return await getMaterialCalculationsByProjectId(projectId);
      }
    },
    queryKey: ["material-calculations", projectId],
  });

  const result: ResultType = {};

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

  const remapMaterial = Object.values(result);

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
    <div
      className={cn(
        "absolute top-8 z-50 flex items-center space-y-1.5 overflow-hidden rounded-s-md drop-shadow-md transition-all duration-700 lg:top-20",
        isOpen ? "right-0" : "lg:-right-[480px]",
      )}
    >
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          nonce="true"
          className="grid size-32 place-items-center gap-y-4 border-none bg-transparent shadow-none"
        >
          <RotatingLines
            visible={true}
            width="64"
            strokeColor="skyblue"
            strokeWidth="5"
            animationDuration="infinity"
            ariaLabel="rotating-lines-loading"
          />
          <p className="mt-4 text-2xl font-semibold text-primary">Updating</p>
        </DialogContent>
      </Dialog>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="grid h-10 w-8 cursor-pointer place-items-center rounded-s-md bg-white text-primary"
      >
        {isOpen ? (
          <ChevronRight className="w-6" />
        ) : (
          <ChevronLeft className="w-6" />
        )}
      </div>
      <ScrollArea className="relative h-[520px] w-[480px] rounded-s-md bg-white px-3 py-5">
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
          <AddMaterialModal materials={materials || []} projectId={projectId}>
            <Button size="sm" className="flex h-8 items-center gap-3">
              Add <Plus className="size-5" />
            </Button>
          </AddMaterialModal>
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
            <p className="w-64 text-end">
              Make sure your material plans before continue
            </p>
          </Link>
        )}
      </ScrollArea>
    </div>
  );
}

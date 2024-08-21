import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createMaterialCalculation } from "@/lib/network/material-calculation";
import {
  deleteMaterialSection,
  updateMaterialSection,
} from "@/lib/network/material-section";
import { CreateMaterialCalculationType } from "@/lib/type/material-calculation";
import {
  CreateMaterialSectionType,
  MaterialSectionType,
} from "@/lib/type/material-section";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "sonner";

interface ComponentVariantProps {
  materialSection: MaterialSectionType;
  sectionId: string;
}

export default function MaterialSection({
  materialSection,
  sectionId,
}: ComponentVariantProps) {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const variantName = materialSection.MaterialVariant.name;
  const mainName = materialSection.MaterialVariant.Material.name;
  const price = materialSection.MaterialVariant.price;
  const quantity = materialSection.quantity;
  const useService = materialSection.useService;

  const handleMutationStart = () => {
    setIsDialogOpen(true);
  };

  const handleMutationEnd = () => {
    setIsDialogOpen(false);
  };

  const { mutate: onUpdateCalculation } = useMutation({
    mutationFn: (values: CreateMaterialSectionType) =>
      updateMaterialSection(materialSection.id, values),
    onMutate: handleMutationStart,
    onSuccess: () => {
      toast.success("Material Updated!");
      queryClient.invalidateQueries({
        queryKey: ["material-section", sectionId],
      });
      handleMutationEnd();
    },
    onError: (error) => {
      toast.error("Something went wrong!");
      console.log(error);
      handleMutationEnd();
    },
  });

  const { mutate: onDeleteMaterialSection } = useMutation({
    mutationFn: () => deleteMaterialSection(materialSection.id),
    onSuccess: () => {
      toast.success("Material Removed!");
      queryClient.invalidateQueries({
        queryKey: ["material-section", sectionId],
      });
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  async function handleIncrease() {
    onUpdateCalculation({
      variantId: materialSection.variantId,
      offerId: materialSection.offerId,
      projectId: materialSection.projectId,
      quantity: quantity + 1,
    });
  }

  async function handleDecrease() {
    if (quantity === 0) {
      onDeleteMaterialSection();
    } else {
      onUpdateCalculation({
        variantId: materialSection.variantId,
        offerId: materialSection.offerId,
        projectId: materialSection.projectId,
        quantity: quantity - 1,
      });
    }
  }

  async function handleChange(value: string) {
    onUpdateCalculation({
      variantId: materialSection.variantId,
      offerId: materialSection.offerId,
      projectId: materialSection.projectId,
      quantity: Number(value),
    });
  }

  async function handleUseService() {
    onUpdateCalculation({
      variantId: materialSection.variantId,
      offerId: materialSection.offerId,
      projectId: materialSection.projectId,
      quantity: quantity,
      useService: useService === "true" ? "false" : "true",
    });
  }

  const totalPrice = Number(materialSection.MaterialVariant.price) * quantity;
  const totalService =
    materialSection.useService === "true"
      ? Number(materialSection.MaterialVariant.service) * quantity
      : 0;
  const totalCost = totalPrice + totalService;

  return (
    <>
      <div className="flex items-center gap-2 py-2">
        <p className="flex-[2] text-sm">{mainName}</p>
        <p className="flex-[3] text-sm">{variantName}</p>
        <div className="flex flex-[1] justify-center">
          <Checkbox
            className="size-6 text-sm"
            checked={useService === "true"}
            onCheckedChange={handleUseService}
          />
        </div>
        <p className="flex-[2] text-sm font-medium">
          Rp {totalCost.toLocaleString("en-EN")}
        </p>
        <div className="flex flex-[1] items-center justify-end gap-2">
          <Button
            variant={"secondary"}
            size={"icon"}
            className="size-5 border border-primary"
            onClick={handleDecrease}
          >
            <Minus className="lg:w-4" />
          </Button>
          <Input
            value={quantity}
            onChange={(e) => handleChange(e.target.value)}
            className="h-6 w-8 px-2"
          />
          <Button onClick={handleIncrease} size={"icon"} className="size-5">
            <Plus className="size-4" />
          </Button>
        </div>
      </div>
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
    </>
  );
}

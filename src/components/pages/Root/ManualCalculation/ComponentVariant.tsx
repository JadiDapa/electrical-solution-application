import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  createMaterialCalculation,
  deleteMaterialCalculation,
  updateMaterialCalculation,
} from "@/lib/network/material-calculation";
import { CreateMaterialCalculationType } from "@/lib/type/material-calculation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { RotatingLines } from "react-loader-spinner";

interface ComponentVariantProps {
  variantId: string;
  projectId: string;
  quantity?: number;
  calculationId?: string;
  title: string;
  price: string;
}

export default function ComponentVariant({
  variantId,
  projectId,
  quantity = 0,
  calculationId = "",
  title,
  price,
}: ComponentVariantProps) {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMutationStart = () => {
    setIsDialogOpen(true);
  };

  const handleMutationEnd = () => {
    setIsDialogOpen(false);
  };

  const { mutate: onCreateCalculation } = useMutation({
    mutationFn: (values: CreateMaterialCalculationType) =>
      createMaterialCalculation(values),
    onMutate: handleMutationStart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["material-calculations"] });
      handleMutationEnd();
    },
    onError: () => {
      toast.error("Something went wrong!");
      handleMutationEnd();
    },
  });

  const { mutate: onUpdateCalculation } = useMutation({
    mutationFn: (values: CreateMaterialCalculationType) =>
      updateMaterialCalculation(calculationId, values),
    onMutate: handleMutationStart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["material-calculations"] });
      handleMutationEnd();
    },
    onError: (error) => {
      toast.error("Something went wrong!");
      console.log(error);
      handleMutationEnd();
    },
  });

  const { mutate: onDeleteCalculation } = useMutation({
    mutationFn: () => deleteMaterialCalculation(calculationId),
    onMutate: handleMutationStart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["material-calculations"] });
      handleMutationEnd();
    },
    onError: (error) => {
      toast.error("Something went wrong!");
      console.log(error);
      handleMutationEnd();
    },
  });

  async function handleIncrease() {
    if (quantity === 0) {
      onCreateCalculation({
        materialVariantId: variantId,
        projectId: projectId,
        quantity: 1,
      });
    } else {
      onUpdateCalculation({
        materialVariantId: variantId,
        projectId: projectId,
        quantity: quantity + 1,
      });
    }
  }

  async function handleDecrease() {
    if (quantity === 0) {
      return null;
    } else if (quantity <= 1) {
      onDeleteCalculation();
    } else {
      onUpdateCalculation({
        materialVariantId: variantId,
        projectId: projectId,
        quantity: quantity - 1,
      });
    }
  }

  return (
    <div key={title} className="flex items-center py-2">
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
      <p className="flex-[4]">{title}</p>
      <p className="flex-[2] text-lg font-semibold">Rp {price}</p>
      <div className="flex flex-[1] items-center justify-end gap-2">
        <Button
          variant={"secondary"}
          size={"icon"}
          className="size-5 border border-primary"
          onClick={handleDecrease}
        >
          <Minus className="lg:w-4" />
        </Button>
        <span className="flex w-4 text-lg font-medium">{quantity}</span>
        <Button onClick={handleIncrease} size={"icon"} className="size-5">
          <Plus className="lg:w-4" />
        </Button>
      </div>
    </div>
  );
}

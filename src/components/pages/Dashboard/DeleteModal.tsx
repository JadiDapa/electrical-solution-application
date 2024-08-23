"use client";

import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteDialogProps = {
  params: string;
  deleteFunction: (params: string) => Promise<string>;
  queryKey: string;
};

export default function DeleteModal({
  params,
  deleteFunction,
  queryKey,
}: DeleteDialogProps) {
  const queryClient = useQueryClient();

  const { mutate: onDelete } = useMutation({
    mutationFn: () => deleteFunction(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success("Data Deleted!");
    },
    onError: (error) => {
      toast.error("Something went wrong!");
      console.error(error);
    },
  });

  async function handleDelete() {
    await onDelete();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-primary">
        <Trash2 size={20} className="" />
      </AlertDialogTrigger>
      <AlertDialogContent className="font-inter">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete This Data?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Make sure your decission before
            deleting!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-700"
            onClick={handleDelete}
          >
            Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

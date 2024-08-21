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

type DeleteDialogProps = {
  params: string;
  deleteFunction: (params: string) => Promise<string>;
};

export default function DeleteModal({
  params,
  deleteFunction,
}: DeleteDialogProps) {
  const router = useRouter();

  async function handleDelete() {
    try {
      const result = await deleteFunction(params);

      if (result) {
        toast.success("Data Berhasil Dihapus!");
        router.refresh();
      } else {
        toast.error("Terjadi kesalahan saat menghapus data");
      }
    } catch (error) {
      toast.error("Terjadi Kesalahan Pada Server");
      console.log(error);
    }
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

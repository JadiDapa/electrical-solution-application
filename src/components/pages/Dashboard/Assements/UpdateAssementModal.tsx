import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAssement, updateAssement } from "@/lib/network/assement";
import { AssementType, CreateAssementType } from "@/lib/type/assement";

interface UpdateAssementModalProps {
  children?: ReactNode;
  assement: AssementType;
}

const formSchema = z.object({
  title: z.string().min(1),
  price: z.string().min(1),
});

export default function UpdateAssementModal({
  children,
  assement,
}: UpdateAssementModalProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: assement.title,
      price: assement.price,
    },
  });

  const { mutate: onUpdateAssement } = useMutation({
    mutationFn: (values: CreateAssementType) =>
      updateAssement(assement.id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assements"] });
      setOpen(false);
      toast.success("Asset Management Update!");
    },
    onError: (error) => {
      toast.error("Something went wrong!");
      console.error(error);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdateAssement(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="font-inter">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold text-primary">
            Update Assement Option
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: Platinum" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: 1000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full lg:w-1/3">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

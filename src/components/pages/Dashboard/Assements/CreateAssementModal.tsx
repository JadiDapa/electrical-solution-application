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
import { CreateUserType } from "@/lib/type/user";
import { createUser } from "@/lib/network/user";
import { useRouter } from "next/navigation";
import { createAssement } from "@/lib/network/assement";
import { CreateAssementType } from "@/lib/type/assement";

interface CreateAssementModalProps {
  children?: ReactNode;
}

const formSchema = z.object({
  title: z.string().min(1),
  price: z.string().min(1),
});

export default function CreateAssementModal({
  children,
}: CreateAssementModalProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: "",
    },
  });

  const { mutate: onCreateAssement } = useMutation({
    mutationFn: (values: CreateAssementType) => createAssement(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assements"] });
      setOpen(false);
      toast.success("User Created!");
    },
    onError: (error) => {
      toast.error("Something went wrong!");
      console.error(error);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    onCreateAssement(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="font-inter">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold text-primary">
            Create Assement Option
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

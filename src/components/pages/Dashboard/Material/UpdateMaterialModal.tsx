import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import slugify from "slugify";
import { CreateMaterialType, MaterialType } from "@/lib/type/material";
import { updateMaterial } from "@/lib/network/material";
import { useRouter } from "next/navigation";

type UpdateMaterialModalProps = {
  data: MaterialType;
  children?: ReactNode;
};

const formSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
});

export default function UpdateMaterialModal({
  data,
  children,
}: UpdateMaterialModalProps) {
  const [image, setImage] = useState<File | string>(data.image as string);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const picture = e.target.files?.[0];
    setImage(picture!);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: data.name,
      slug: data.slug,
      description: data.description || "",
    },
  });

  function makeSlug() {
    const slugValue = slugify(form.getValues("name"), { lower: true });
    form.setValue("slug", slugValue);
  }

  const { mutate: onUpdateMaterial } = useMutation({
    mutationFn: (values: CreateMaterialType) => updateMaterial(data.id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      setOpen(false);
      router.refresh();
      toast.success("Material Updated!");
    },
    onError: (error) => {
      toast.error("Something went wrong!");
      console.error(error);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdateMaterial({
      ...values,
      image: image!,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="font-inter">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold text-primary">
            Tambah Negara
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: MV Trafo (AL-AL)"
                      {...field}
                      onBlur={makeSlug}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Material description"
                      {...field}
                      onBlur={makeSlug}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>Slug (otomatis)</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: korea-selatan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="">
              <FormLabel>Picture</FormLabel>
              <Input onChange={handleImageUpload} type="file" />
            </div>

            <Button className="w-full lg:w-1/3">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

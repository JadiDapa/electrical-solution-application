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
import slugify from "slugify";
import { useRouter } from "next/navigation";
import { createMaterial } from "@/lib/network/material";

type CreateMaterialModalProps = {
  children?: ReactNode;
};

const formSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
});

export default function CreateMaterialModal({
  children,
}: CreateMaterialModalProps) {
  const [image, setImage] = useState<File>();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const picture = e.target.files?.[0];
    setImage(picture);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  });

  function makeSlug() {
    const slugValue = slugify(form.getValues("name"), { lower: true });
    form.setValue("slug", slugValue);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await createMaterial({
        ...values,
        image: image!,
      });

      if (result) {
        setOpen(!open);
        toast.success("New Material Created!");
        router.refresh();
      } else {
        toast.error("Failed To Create Material! Check Your Inputs");
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
      console.log(error);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="font-inter">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold text-primary">
            Create New Material
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

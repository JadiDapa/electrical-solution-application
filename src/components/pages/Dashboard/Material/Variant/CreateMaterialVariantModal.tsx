import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useEffect, useState } from "react";
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
import { getAllMaterials } from "@/lib/network/material";
import { createMaterialVariant } from "@/lib/network/material-variant";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CreateMaterialVariantType } from "@/lib/type/material-variant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type CreateMaterialVariantModalProps = {
  children?: ReactNode;
};

const formSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  unit: z.string().min(1),
  price: z.string().min(1),
  materialId: z.string().min(1),
  service: z.string().min(1),
});

export default function CreateMaterialVariantModal({
  children,
}: CreateMaterialVariantModalProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { data: materials } = useQuery({
    queryFn: getAllMaterials,
    queryKey: ["materials"],
  });

  const { mutate: onCreateVariant } = useMutation({
    mutationFn: (values: CreateMaterialVariantType) =>
      createMaterialVariant(values),
    onSuccess: () => {
      setOpen(false);
      toast.success("Material Added!");
      queryClient.invalidateQueries({ queryKey: ["material-variants"] });
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      unit: "",
      price: "",
      materialId: "",
      service: "",
    },
  });

  function makeSlug() {
    const slugValue = slugify(form.getValues("name"), { lower: true });
    form.setValue("slug", slugValue);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await onCreateVariant(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="font-inter">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold text-primary">
            Create New Material Variant
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="materialId"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Main Material</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[100%] justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? materials?.find((item) => item.id === field.value)
                                ?.name
                            : "Select the main material"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
                      <Command className="w-full">
                        <CommandInput placeholder="Select main material..." />
                        <CommandList>
                          <CommandGroup>
                            {materials?.map((item) => (
                              <CommandItem
                                value={item.id}
                                key={item.id}
                                onSelect={() => {
                                  form.setValue("materialId", item.id);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    item.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {item.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material Variant Name</FormLabel>
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
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material Unit</FormLabel>
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
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
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Material service"
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

            <Button className="w-full lg:w-1/3">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

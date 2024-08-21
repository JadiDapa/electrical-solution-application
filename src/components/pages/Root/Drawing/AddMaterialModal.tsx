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
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { MaterialType } from "@/lib/type/material";
import { MaterialVariantType } from "@/lib/type/material-variant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateMaterialCalculationType } from "@/lib/type/material-calculation";
import { createMaterialCalculation } from "@/lib/network/material-calculation";

const formSchema = z.object({
  materialId: z.string().min(1),
  variantId: z.string().min(1),
  quantity: z.string().min(1),
});

type AddMaterialModalProps = {
  materials: MaterialType[];
  projectId: string;
  children?: ReactNode;
};

export default function AddMaterialModal({
  materials,
  projectId,
  children,
}: AddMaterialModalProps) {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<MaterialVariantType[] | []>([]);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      materialId: "",
      variantId: "",
      quantity: "",
    },
  });

  useEffect(() => {
    const main = form.getValues("materialId");
    if (main) {
      const mainMaterial = materials.find((item) => item.id === main);
      if (mainMaterial) {
        setVariant(mainMaterial.MaterialVariant);
      }
    }
  }, [[form, materials]]);

  const { mutate: onCreateCalculation } = useMutation({
    mutationFn: (values: CreateMaterialCalculationType) =>
      createMaterialCalculation(values),
    onSuccess: () => {
      setOpen(false);
      toast.success("Material Added!");
      queryClient.invalidateQueries({ queryKey: ["material-calculations"] });
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    onCreateCalculation({
      materialVariantId: values.variantId,
      projectId: projectId,
      quantity: Number(values.quantity),
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="font-inter min-w-[720px]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold text-primary">
            Add Material
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3">
            <FormField
              control={form.control}
              name="materialId"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
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
                            : "Main Material"}
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
              name="variantId"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
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
                            ? variant?.find((item) => item.id === field.value)
                                ?.name
                            : "Material Variant"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
                      <Command className="w-full">
                        <CommandInput placeholder="Select material variant..." />
                        <CommandList>
                          <CommandGroup>
                            {variant?.map((item) => (
                              <CommandItem
                                value={item.id}
                                key={item.id}
                                onSelect={() => {
                                  form.setValue("variantId", item.id);
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
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="number" placeholder="QTY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="max-w-fit">
              <Plus className="text-white" />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

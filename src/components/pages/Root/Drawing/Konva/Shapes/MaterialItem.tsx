import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  deleteMaterialCalculation,
  updateMaterialCalculation,
} from "@/lib/network/material-calculation";
import { CreateMaterialCalculationType } from "@/lib/type/material-calculation";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface MaterialItemProps {
  mainMaterial: string;
  materialVariants: VariantItem[];
}

export default function MaterialItem({
  mainMaterial,
  materialVariants,
}: MaterialItemProps) {
  return (
    <div key={mainMaterial} className="py-2">
      <h4 className="font-semibold">{mainMaterial}</h4>
      <div className="mt-2 space-y-1 ps-2">
        {materialVariants.map((variant) => (
          <VariantItem key={variant.calculationId} variants={variant} />
        ))}
      </div>
    </div>
  );
}

interface VariantItem {
  calculationId: string;
  name: string;
  quantity: number;
  price: string | number;
  status: string;
}

const FormSchema = z.object({
  quantity: z.number(),
  status: z.string(),
});

export function VariantItem({ variants }: { variants: VariantItem }) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    values: {
      quantity: variants.quantity,
      status: variants.status,
    },
  });

  const { mutate: onUpdateCalculation } = useMutation({
    mutationFn: (values: CreateMaterialCalculationType) =>
      updateMaterialCalculation(variants.calculationId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["material-calculations"] });
      toast.success("Calculation updated!");
    },
    onError: (error) => {
      toast.error("Something went wrong!");
      console.error(error);
    },
  });

  const quantity = Number(form.getValues("quantity"));

  async function handleQuantityChange() {
    onUpdateCalculation({
      quantity: quantity,
    });
  }

  async function handleChecked(checked: boolean) {
    const updatedStatus = checked ? "true" : "false";
    onUpdateCalculation({
      status: updatedStatus,
    });
    form.setValue("status", updatedStatus);
  }

  return (
    <Form {...form}>
      <form key={variants.calculationId} className="flex gap-1.5">
        <div className="flex flex-[6] gap-1">
          -
          <p
            className={cn(
              "text-sm",
              variants.status === "true" && "text-slate-300",
            )}
          >
            {variants.name}
          </p>
        </div>

        <div className="flex flex-[3] gap-1">
          <p className="text-sm">
            Rp {(Number(variants.price) * variants.quantity).toLocaleString()}
          </p>
        </div>

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="flex-[1]">
              <FormControl>
                <Input
                  {...form.register("quantity")}
                  type="number"
                  onChange={handleQuantityChange}
                  className="h-6 w-16 text-sm outline-transparent ring-transparent"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex-[1]">
              <FormControl>
                <Checkbox
                  className="size-6 text-sm"
                  checked={field.value === "true"}
                  onCheckedChange={handleChecked}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

import { getMaterialCalculationsByProjectId } from "@/lib/network/material-calculation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import MaterialItem from "../Drawing/Konva/Shapes/MaterialItem";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ProjectType } from "@/lib/type/project";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CreateOfferType, OfferType } from "@/lib/type/offer";
import { createOffer } from "@/lib/network/offer";
import OfferMaterialSelection from "./OfferMaterialSelection";
import OfferPlannedAssets from "./OfferPlannedAssets";

interface OfferFormProps {
  project: ProjectType;
}

export const offerSchema = z.object({
  projectId: z.string().min(1),
  customer: z.string().min(1),
  address: z.string().min(1),
  quote: z.string().min(1),
  validity: z.string().min(1),
});

export default function OfferForm({ project }: OfferFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof offerSchema>>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      projectId: project.id,
      customer: project.name,
      address: project.address,
      quote: "",
      validity: "",
    },
  });

  const { mutate: onCreateOffer } = useMutation({
    mutationFn: (values: CreateOfferType) => createOffer(values),
    onSuccess: (result: OfferType) => {
      toast.success("Project Offer Created!");
      router.push(`/invoice/build-electrical-installation/${project.id}`);
    },
    onError: (error) => {
      toast.error("Something Went Wrong!");
      console.log(error);
    },
  });

  async function onSubmit(values: z.infer<typeof offerSchema>) {
    await onCreateOffer(values);
  }

  return (
    <section
      id="calculation-selection"
      className="relative items-center gap-12 space-y-6 bg-primary/5 px-4 pb-12 lg:px-24 lg:py-6 lg:pb-6"
    >
      <h2 className="border-l-8 border-primary ps-3 text-4xl font-semibold">
        Project Offer Form
      </h2>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-[2] space-y-6 rounded-xl bg-white p-2 lg:px-6 lg:py-9">
          <OfferMaterialSelection projectId={project.id} />

          <Form {...form}>
            <form
              className="w-full items-center space-y-6 rounded-lg border-2 border-dashed p-2 text-2xl font-semibold lg:p-6"
              autoComplete="false"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Project Id
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="ID of project" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Customer Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Project's customer Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Customer Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Project's customer address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <FormField
                  control={form.control}
                  name="quote"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Quote #
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex : 0011/PRIO/UP6/2024 "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="validity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Project Validity
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex: Jl. Merdeka Jaya No. 10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />
              <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
                <Button type="submit">Konfirmasi Pesanan</Button>
                <div className="text-base font-medium">
                  <p className="text-center lg:text-start">
                    Pastikan semua data sudah tepat sebelum melanjutkan ke
                    estimasi penawaran!
                  </p>
                </div>
              </div>
            </form>
          </Form>
        </div>

        <OfferPlannedAssets projectId={project.id} />
      </div>
    </section>
  );
}

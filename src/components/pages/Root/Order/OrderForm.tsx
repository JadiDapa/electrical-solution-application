import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { createProject } from "@/lib/network/project";
import { getAllUsers } from "@/lib/network/user";
import { CreateProjectType, ProjectType } from "@/lib/type/project";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const orderSchema = z.object({
  type: z.string().min(1),
  level: z.string().min(1),
  name: z.string().min(1),
  phone_number: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  province: z.string().min(1),
  instance: z.string().min(1),
  rates: z.string().min(1),
  power: z.string().min(1),
  needs: z.string().min(1),
  price: z.string().min(1),
  unit_handler: z.string().min(1),
  status: z.string().min(1),
});

interface OrderFormProps {
  orderLevel: string;
  orderPrice: string;
}

export default function OrderForm({ orderLevel, orderPrice }: OrderFormProps) {
  const router = useRouter();
  const { data } = useSession();
  const userId = data?.user?.id;

  const { data: users } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["users"],
  });

  const { mutate: onCreateProject } = useMutation({
    mutationFn: (values: CreateProjectType) => createProject(values),
    onSuccess: (result: ProjectType) => {
      toast.success("Project Created!");
      router.push(`/invoice/asset-management/${result.id}`);
    },
    onError: (error) => {
      toast.error("Something Went Wrong!");
      console.log(error);
    },
  });

  const units = users?.filter((user) => user.role === "unit");

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      type: "assement",
      level: orderLevel,
      name: "",
      phone_number: "",
      address: "",
      city: "",
      province: "",
      instance: "",
      rates: "",
      power: "",
      needs: "",
      unit_handler: "",
      price: orderPrice,
      status: "estimation",
    },
  });

  async function onSubmit(values: z.infer<typeof orderSchema>) {
    await onCreateProject({
      ...values,
      userId: userId as string,
      evidence: "no evidence",
    });
  }

  return (
    <section
      id="build-electric-installation"
      className="relative items-center gap-12 space-y-6 bg-primary/5 px-9 py-6 lg:px-24"
    >
      <h2 className="border-l-8 border-primary ps-3 text-3xl font-semibold lg:text-4xl">
        Product Order Form
      </h2>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-[2] space-y-3 rounded-xl bg-white p-2 lg:p-3">
          <Form {...form}>
            <form
              className="w-full items-center space-y-4 rounded-lg border-2 border-dashed p-4 text-2xl font-semibold lg:space-y-6 lg:p-6"
              autoComplete="false"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Fullname
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="ex: John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="ex: 0812012345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        City
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="ex: Pekanbaru" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Province
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="ex: Riau" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Address
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
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <FormField
                  control={form.control}
                  name="instance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Instance
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="ex: PT. Merdeka Jaya " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unit_handler"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="text-lg font-semibold">
                        Unit Handler
                      </FormLabel>
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
                                ? units?.find((item) => item.id === field.value)
                                    ?.name
                                : "Select unit to handle project"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
                          <Command className="w-full">
                            <CommandInput placeholder="Select unit to handle project..." />
                            <CommandList>
                              <CommandGroup>
                                {units?.map((item) => (
                                  <CommandItem
                                    value={item.id}
                                    key={item.id}
                                    onSelect={() => {
                                      form.setValue("unit_handler", item.id);
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
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <FormField
                  control={form.control}
                  name="rates"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Electricity Ratess
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="ex: Pekanbaru" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="power"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Electricity Power
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="ex: Pekanbaru" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="needs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Needs Detail
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your needs for this product shortly here!"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />
              <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
                <div className="hidden text-base font-medium lg:block">
                  <p>Make sure to fill your data correctly before continue!</p>
                </div>
                <Button type="submit">Konfirmasi Pesanan</Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="flex-[1] space-y-3 rounded-xl bg-white p-2 lg:p-3">
          <div className="w-full items-center space-y-4 rounded-lg border-2 border-dashed p-4 lg:space-y-6 lg:p-6">
            <h2 className="text-3xl font-semibold text-primary">Order Data</h2>
            <div className="lg:flex">
              <p className="w-24 font-bold">Product :</p>
              <p className="w-64">Asset Management - {orderLevel}</p>
            </div>
            <Separator />
            <div className="lg:flex">
              <p className="w-24 font-bold">Fullname :</p>
              <p className="w-64">{form.watch("name")}</p>
            </div>
            <Separator />
            <div className="lg:flex">
              <p className="w-24 font-bold">Phone :</p>
              <p className="w-64">{form.watch("phone_number")}</p>
            </div>
            <Separator />
            <div className="lg:flex">
              <p className="w-24 font-bold">City :</p>
              <p className="w-64">{form.watch("city")}</p>
            </div>
            <Separator />
            <div className="lg:flex">
              <p className="w-24 font-bold">Province :</p>
              <p className="w-64">{form.watch("province")}</p>
            </div>
            <Separator />
            <div className="lg:flex">
              <p className="w-24 font-bold">Address :</p>
              <p className="w-64">{form.watch("address")}</p>
            </div>
            <Separator />
            <div className="lg:flex">
              <p className="w-24 font-bold">Instance :</p>
              <p className="w-64">{form.watch("instance")}</p>
            </div>
            <Separator />
            <div className="lg:flex">
              <p className="w-24 font-bold">Unit Handler :</p>
              <p>
                {
                  units?.find((item) => item.id === form.watch("unit_handler"))
                    ?.name
                }
              </p>
            </div>
            <Separator />
            <div className="lg:flex">
              <p className="w-24 font-bold">Rates :</p>
              <p className="w-64">{form.watch("rates")}</p>
            </div>
            <Separator />
            <div className="lg:flex">
              <p className="w-24 font-bold">Power :</p>
              <p className="w-64">{form.watch("power")}</p>
            </div>
            <Separator />
            <div className="lg:flex">
              <p className="w-24 font-bold">Needs :</p>
              <p className="w-64">{form.watch("needs")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

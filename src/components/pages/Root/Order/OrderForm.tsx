import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const orderSchema = z.object({
  fullname: z.string().min(1),
  phone_number: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  province: z.string().min(1),
  instance: z.string().min(1),
  rates: z.string().min(1),
  power: z.string().min(1),
  needs: z.string().min(1),
});

export default function OrderForm() {
  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      fullname: "",
      phone_number: "",
      address: "",
      city: "",
      province: "",
      instance: "",
      rates: "",
      power: "",
      needs: "",
    },
  });

  async function onSubmit(values: z.infer<typeof orderSchema>) {
    console.log(values);
  }

  return (
    <section
      id="build-electric-installation"
      className="relative items-center gap-12 space-y-6 bg-primary/5 px-9 py-6 lg:px-24"
    >
      <h2 className="border-l-8 border-primary ps-3 text-4xl font-semibold">
        Data Keterangan Pesanan
      </h2>
      <div className="flex gap-6">
        <div className="flex-[2] space-y-3 rounded-xl bg-white p-3">
          <Form {...form}>
            <form
              className="w-full items-center space-y-6 rounded-lg border-2 border-dashed p-6 text-2xl font-semibold"
              autoComplete="false"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Nama Lengkap
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="ex: johndoe@gmail.com" {...field} />
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
                      Nomor Telepon
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="ex: 0812012345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Kota
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
                        Provinsi
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
                      Alamat
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
              <FormField
                control={form.control}
                name="instance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Instansi
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="ex: PT. Merdeka Jaya " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="rates"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Tarif Listrik
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
                        Daya Listrik
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
                      Detail Kebutuhan
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Jelaskan kebutuhan kamu untuk memesan produk"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />
              <div className="grid grid-cols-2 items-center gap-6">
                <div className="text-base font-medium">
                  <p>
                    Pastikan semua data sudah tepat sebelum melanjutkan ke
                    estimasi penawaran!
                  </p>
                </div>
                <Button type="submit">Konfirmasi Pesanan</Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="flex-[1] space-y-3 rounded-xl bg-white p-3">Tes</div>
      </div>
    </section>
  );
}

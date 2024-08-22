import { Separator } from "@/components/ui/separator";
import { getProjectById } from "@/lib/network/project";
import { ArrowLeftCircle, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { auth } from "@/auth";

export default async function Invoice({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);
  const session = await auth();

  let price = 0;

  switch (project.level) {
    case "bronze":
      price = 17500000;
      break;
    case "silver":
      price = 22500000;
      break;
    case "gold":
      price = 35000000;
      break;
  }

  const tax = ((price || 0) * 11) / 100;

  return (
    <section
      id="invoice"
      className="relative w-full space-y-6 bg-primary/5 px-6 py-32 lg:px-24"
    >
      <div className="flex items-center gap-3 text-2xl">
        <ArrowLeftCircle />
        Back
      </div>
      <h1 className="max-w-fit border-b-4 border-primary ps-3 text-2xl font-bold text-foreground md:text-3xl lg:mx-auto lg:text-4xl">
        Estimasi Pembayaran - Invoice
      </h1>
      <div className="mx-auto aspect-[1/1.4] w-[800px] origin-top-left scale-[40%] space-y-12 bg-white px-12 py-24 sm:scale-[60%] md:scale-[80%] lg:scale-100">
        <figure className="relative h-14 w-48">
          <Image
            src="/images/logo-pln-hp.png"
            alt="Logo"
            fill
            className="object-contain object-bottom"
          />
        </figure>
        <div className="flex justify-between font-medium">
          <div className="space-y-0.5">
            <p className="font-bold">Invoice To :</p>
            <p className="font-semibold text-primary">{project.name}</p>
            <p className="text-sm">{session?.user?.email}</p>
            <p className="text-sm">{project.phone_number}</p>
            <p className="text-sm">{project.address}</p>
            <p className="text-sm">
              {project.city}, {project.province}
            </p>
          </div>
          <div className="text-end">
            <p className="text-5xl font-extrabold tracking-wider text-primary">
              INVOICE
            </p>
            <p className="font-semibold">PLN Haleyora Power</p>
            <p className="text-sm">{new Date(project.createdAt).getDay()}</p>
            <p className="text-sm">
              {new Date(project.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm">Pekanbaru, Riau</p>
          </div>
        </div>
        <div className="">
          <div className="grid w-full grid-cols-12 bg-primary text-background">
            <p className="col-span-6 py-1 ps-6">DESCRIPTION</p>
            <p className="col-span-2 py-1 text-center">PRICE</p>
            <p className="col-span-2 py-1 text-center">UNIT</p>
            <p className="col-span-2 py-1 text-center">TOTAL</p>
          </div>
          <div className="grid w-full grid-cols-12 items-center border-b">
            <div className="col-span-6 space-y-1 py-2 ps-6">
              <p className="font-semibold">
                <span className="uppercase">{project.level}</span> - Asset
                Management
              </p>
              <p className="text-sm">Lorem ipsum dolor sit amet consectetur</p>
            </div>
            <p className="col-span-2 py-1 text-center">
              Rp {price.toLocaleString("en-En")}
            </p>
            <p className="col-span-2 py-1 text-center">1</p>
            <p className="col-span-2 py-1 text-center">
              Rp {price.toLocaleString("en-En")}
            </p>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <table className="">
            <thead>
              <tr>
                <th className="py-2 text-lg font-bold">PAYMENT / METHOD</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="">
              <tr>
                <td className="py-1 text-sm">BANK :</td>
                <td className="py-1 text-sm">BRI</td>
              </tr>
              <tr>
                <td className="py-1 text-sm">A/N :</td>
                <td className="py-1 text-sm">Haleyora Power</td>
              </tr>
              <tr>
                <td className="py-1 text-sm">Account :</td>
                <td className="py-1 text-sm">089523927152</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-2 rounded-lg border-2 border-primary px-6 py-2">
            {" "}
            <table className="">
              <thead>
                <tr>
                  <th className="py-2 text-end text-lg font-bold"></th>
                  <th className="py-2 text-end text-lg font-bold">PRICING</th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="">
                  <td className="py-1 text-sm">Subtotal :</td>
                  <td className="py-1 text-end text-sm">
                    Rp {price.toLocaleString("en-En")}
                  </td>
                </tr>
                <tr className="">
                  <td className="py-1 text-sm">PPN (11%) :</td>
                  <td className="py-1 text-end text-sm">
                    Rp {tax.toLocaleString("en-En")}
                  </td>
                </tr>
                <tr className="">
                  <td className="py-1 text-sm">
                    <Separator />
                  </td>
                  <td className="py-1 text-end text-sm">
                    <Separator />
                  </td>
                </tr>

                <tr className="">
                  <td className="py-1 text-sm font-bold">TOTAL :</td>
                  <td className="text-end text-xl font-bold text-primary">
                    Rp {(price + tax).toLocaleString("en-EN")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between font-medium">
          <div className="space-y-0.5">
            <p className="text-lg font-bold">TERMS & CONDITION</p>
            <p className="max-w-sm py-1 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus, cumque!
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="grid size-8 place-items-center rounded-full bg-primary text-lg font-bold text-background">
                <Phone size={18} />
              </div>
              <p>+62 123-123-123</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid size-8 place-items-center rounded-full bg-primary text-lg font-bold text-background">
                <Mail size={18} />
              </div>
              <p>plnhp@gmail.com</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid size-8 place-items-center rounded-full bg-primary text-lg font-bold text-background">
                <MapPin size={18} />
              </div>
              <p>Riau, Pekanbaru</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

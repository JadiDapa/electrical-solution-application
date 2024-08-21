import { User } from "lucide-react";
import Image from "next/image";

const productData = [
  {
    title: "Customer Power Solution",
    image: "/images/pcb-1.png",
    detail: (
      <ul className="list-outside list-disc">
        <li>Manajemen Aset</li>
        <li>Operation & Maintenance Kawasan Kelistrikan</li>
        <li>Treatment Oli & Pengujian Transformator</li>
        <li>Deteksi & Asesmen Kabel</li>
        <li>Power Quality</li>
        <li>Backup Power</li>
        <li>Perbaikan & Penyediaan Material Support MV/LV</li>
        <li>
          Penyediaan Instalasi Listrik Termasuk Pembangunan Gardu Pelanggan
        </li>
      </ul>
    ),
  },
  {
    title: "EV Charging",
    image: "/images/pcb-2.png",
    detail: (
      <>
        <p>
          Pemeliharaan sistem penyaluran listrik ke konsumen akhir Readiness and
          Emergency Team
        </p>
        <ul className="mt-1 list-inside list-disc">
          <li>Manajemen Aset</li>
          <li>Operation & Maintenance Kawasan Kelistrikan</li>
          <li>Treatment Oli & Pengujian Transformator</li>
        </ul>
      </>
    ),
  },
  {
    title: "On Shore Power System",
    image: "/images/pcb-3.png",
    detail: (
      <>
        <p>
          Pemeliharaan Sitem untuk mengalirkan listrik dari pembangkit ke gardu
          listrik utama (main substation)
        </p>
        <div className="mt-1">- Meter Reading</div>
        <div className="">- Billing Collection</div>
        <div className="">- Marketing ICONNET dan PLN Mobile</div>
      </>
    ),
  },
];

export default function ProductToCustomer() {
  return (
    <section
      id="product-core-business"
      className="relative flex flex-col gap-12 bg-primary/5 px-9 py-24 lg:flex-row lg:items-center lg:px-24"
    >
      <div className="order-2 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:order-1 lg:flex-[2] lg:grid-cols-3">
        {productData.map((item, id) => (
          <div
            key={id}
            className="group relative mx-auto h-72 w-[80%] cursor-pointer overflow-hidden rounded-xl bg-white px-6 sm:w-full"
          >
            <div className="absolute left-1 top-1 z-10 rounded-full bg-foreground px-2 py-1 text-xs font-medium text-white transition-all duration-300 group-hover:opacity-0">
              See detail
            </div>
            <Image
              src={item.image}
              alt={item.image + "picture"}
              fill
              className="object-cover object-center brightness-50"
            />
            <h3 className="absolute bottom-2 right-2 text-end text-2xl font-medium text-slate-200 transition-all duration-300 group-hover:opacity-0">
              {item.title}
            </h3>
            <div className="absolute left-0 top-0 h-full w-full translate-y-full bg-black/50 px-4 py-6 text-sm text-white transition-all duration-500 ease-out group-hover:translate-y-0">
              {item.detail}
            </div>
          </div>
        ))}
      </div>
      <div className="order-1 space-y-6 lg:order-2 lg:flex-[1]">
        <h2 className="flex flex-col items-end border-primary pe-3 text-4xl font-semibold text-foreground max-lg:border-r-8 md:text-5xl lg:items-start lg:border-l-8 lg:ps-3 lg:text-start lg:text-6xl">
          <span className="">Product To</span>
          <span className="flex items-end gap-4">
            Customer
            <div className="grid size-9 place-items-center rounded-full bg-primary/60 p-2 text-background shadow-lg md:size-10 lg:size-12">
              <User className="size-5 lg:size-6" />
            </div>
          </span>
        </h2>
        <p className="">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam
          libero non minus, Lorem ipsum dolor sit!
        </p>
      </div>
      <figure className="absolute left-12 top-12 -z-10 size-64 opacity-20 md:size-72 lg:size-80">
        <Image
          src="/images/dots-dark.svg"
          alt="Dots Svg"
          fill
          className="absolute bottom-6"
        />
      </figure>
    </section>
  );
}

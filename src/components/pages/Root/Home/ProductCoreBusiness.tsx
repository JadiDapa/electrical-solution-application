import { BriefcaseBusiness } from "lucide-react";
import Image from "next/image";

const productData = [
  {
    title: (
      <>
        Operation and Maintenance{" "}
        <p className="font-semibold text-sky-300">Transmission</p>
      </>
    ),
    image: "/images/pcb-1.png",
    detail: (
      <>
        <p>
          Pemeliharaan Sitem untuk mengalirkan listrik dari pembangkit ke gardu
          listrik utama (main substation)
        </p>
        <div className="mt-1 flex gap-1">
          -<span>Operator Gardu Induk 150kV dan 20kV</span>
        </div>
        <div className="flex gap-1">
          -<span>Inspeksi Jalur Transmisi</span>
        </div>
      </>
    ),
  },
  {
    title: (
      <>
        Operation and Maintenance{" "}
        <p className="font-semibold text-sky-300">Distribution</p>
      </>
    ),
    image: "/images/pcb-2.png",
    detail: (
      <>
        <p>
          Pemeliharaan sistem penyaluran listrik ke konsumen akhir Readiness and
          Emergency Team
        </p>
        <div className="mt-1 flex gap-1">
          -<span>Inspeksi Jalur Transmisi</span>
        </div>

        <div className="flex gap-1">
          -<span>Inspeksi dan Pemeliharaan Jaringan Distribusi</span>
        </div>
        <div className="flex gap-1">
          -<span>Inspeksi dan Pemeliharaan Gardu dan Trafo</span>
        </div>
        <div className="flex gap-1">
          -<span>Command Center</span>
        </div>
        <div className="flex gap-1">
          -<span>Pemeliharaan Remote Island</span>
        </div>
      </>
    ),
  },
  {
    title: (
      <>
        Operation and Maintenance{" "}
        <p className="font-semibold text-sky-300">Commercial Retail</p>
      </>
    ),
    image: "/images/pcb-3.png",
    detail: (
      <>
        <p>
          Pemeliharaan Sitem untuk mengalirkan listrik dari pembangkit ke gardu
          listrik utama (main substation)
        </p>
        <div className="mt-1 flex gap-1">
          -<span>Meter Reading</span>
        </div>
        <div className="flex gap-1">
          -<span>Billing Collection</span>
        </div>
        <div className="flex gap-1">
          -<span>Marketing ICONNET dan PLN Mobile</span>
        </div>
      </>
    ),
  },
];

export default function ProductCoreBusiness() {
  return (
    <section
      id="product-core-business"
      className="relative flex flex-col gap-12 bg-primary/5 px-9 py-24 lg:flex-row lg:items-center lg:px-24"
    >
      <div className="space-y-6 lg:flex-[1]">
        <h2 className="border-l-8 border-primary ps-3 text-4xl font-semibold text-foreground md:text-5xl lg:text-6xl">
          Product
          <span className="flex items-end gap-4">
            Core
            <div className="grid size-9 place-items-center rounded-full bg-primary/60 p-2 text-background shadow-lg md:size-10 lg:size-12">
              <BriefcaseBusiness className="size-5 lg:size-6" />
            </div>
          </span>
          Business
        </h2>
        <p className="max-w-sm text-end text-sm md:text-start lg:text-base">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam
          libero non minus, Lorem ipsum dolor sit!
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:flex-[2] lg:grid-cols-3">
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
      <figure className="absolute right-8 top-36 -z-10 size-52 opacity-10 md:size-64 lg:right-12 lg:top-12 lg:size-80 lg:opacity-20">
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

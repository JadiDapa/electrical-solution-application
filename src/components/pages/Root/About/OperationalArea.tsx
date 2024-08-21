import { MapPin } from "lucide-react";
import { FaPeopleGroup } from "react-icons/fa6";

import Image from "next/image";
import { PiBuildingOfficeBold, PiUsersThree } from "react-icons/pi";

export default function OperationalArea() {
  return (
    <section
      id="operational-area"
      className="relative flex flex-col items-center gap-12 px-9 py-24 lg:flex-row lg:px-24"
    >
      <div className="relative flex-[2] space-y-6 md:block">
        <h2 className="border-l-8 border-primary ps-3 text-4xl font-semibold text-foreground md:text-5xl lg:text-5xl">
          Wilayah Operasional
        </h2>
        <figure className="relative z-30 aspect-video w-[360px] overflow-hidden md:w-[600px]">
          <Image
            src="/images/map.png"
            alt="Map area operaional"
            fill
            className="object-contain object-center"
          />
        </figure>
      </div>
      <div className="flex-[1] space-y-4 pb-6 max-md:scale-75">
        <div className="space-y-6">
          <div className="relative w-72 rounded-3xl border border-primary bg-primary/70 py-2 pe-6 ps-20">
            <div className="absolute -left-12 -top-2 grid size-28 place-items-center rounded-full bg-primary text-background">
              <MapPin size={64} strokeWidth="1.8" />
            </div>
            <p className="text-4xl font-bold text-background">
              57 <span className="text-lg font-semibold">Kota</span>
            </p>
            <p className="text-4xl font-bold text-background">
              165 <span className="text-lg font-semibold">Kabupaten</span>
            </p>
          </div>
          <div className="relative w-72 rounded-3xl border border-primary bg-primary/70 py-2 pe-6 ps-20">
            <div className="absolute -left-12 -top-2 grid size-28 place-items-center rounded-full bg-primary text-background">
              <PiBuildingOfficeBold strokeWidth="0.5" size={64} />
            </div>
            <div className="flex items-center gap-4 text-4xl font-bold text-background">
              1{" "}
              <div className="text-lg font-semibold leading-4">
                Kantor pusat di Jakarta
              </div>
            </div>
            <p className="text-4xl font-bold text-background">
              7 <span className="text-lg font-semibold">Kantor Cabang</span>
            </p>
          </div>
          <div className="relative w-72 rounded-3xl border border-primary bg-primary/70 py-2 pe-6 ps-20">
            <div className="absolute -left-12 -top-2 grid size-28 place-items-center rounded-full bg-primary text-background">
              <PiUsersThree size={64} strokeWidth="1" />
            </div>
            <p className="text-4xl font-bold text-background">
              30.428 <span className="text-lg font-semibold">Teknisi</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

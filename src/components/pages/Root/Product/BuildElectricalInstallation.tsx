import Image from "next/image";
import { BEIModal } from "./BEIModal";
import { Pencil, ScrollText } from "lucide-react";

export default function BuildElectricalInstallation() {
  return (
    <section
      id="build-electric-installation"
      className="relative flex flex-col items-center gap-12 bg-primary/5 px-9 py-24 lg:flex-row lg:px-24"
    >
      <div className="flex-1 space-y-6 pb-6 lg:space-y-4">
        <h2 className="border-l-8 border-primary ps-3 text-4xl font-semibold text-foreground md:text-5xl lg:text-6xl">
          Build Electrical Installation
        </h2>
        <p className="lg:text-lg">
          Solusi bagi pelanggan prioritas PLN khususnya segmen industri dan
          bisnis dalam mendukung keandalan sistem kelistrikan instalasi milik
          pelanggan (IML) berikut :
        </p>
        <p className="lg:text-lg">
          Kami berkomitmen memelihara kesehatan asset kelistrikan sehingga umur
          pakai peralatan maksimal dan mencegah kerusakan/ pemadaman yang
          berdampak pada kerugian bisnis Anda.
        </p>
        <BEIModal />
      </div>
      <div className="relative flex-1 max-md:scale-90 md:block">
        <div className="absolute right-10 top-10 z-10 mx-auto size-[360px] overflow-hidden rounded-full bg-primary/70" />
        <div className="absolute left-12 top-20 z-20 mx-auto size-[360px] overflow-hidden rounded-full border-4 border-primary/20" />
        <div className="absolute right-28 top-20 z-40 mx-auto grid size-14 place-items-center overflow-hidden rounded-full bg-background text-primary shadow-xl">
          <Pencil />
        </div>
        <div className="absolute bottom-20 left-24 z-40 mx-auto grid size-14 place-items-center overflow-hidden rounded-full bg-background text-primary shadow-xl">
          <ScrollText />
        </div>
        <figure className="relative z-30 mx-auto size-[420px] overflow-hidden">
          <Image
            src="/images/pib-1.png"
            alt="Hero Image"
            fill
            className="object-contain object-bottom"
          />
        </figure>
      </div>
    </section>
  );
}

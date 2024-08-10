import { Check } from "lucide-react";
import Image from "next/image";

export default function ElectricSolution() {
  return (
    <section
      id="electric-solution"
      className="relative flex flex-col items-center justify-between px-9 py-24 lg:flex-row lg:px-24"
    >
      <div className="relative flex-1 md:block">
        <figure className="relative z-10 h-[420px] w-[380px] overflow-hidden">
          <Image
            src="/images/hero.png"
            alt="Hero Image"
            fill
            className="object-contain object-bottom"
          />
        </figure>
      </div>
      <div className="flex-1 space-y-4 pb-6">
        <h2 className="border-l-8 border-primary ps-3 text-6xl font-semibold text-foreground">
          Electric Solution
        </h2>
        <p className="text-lg">
          Solusi bagi pelanggan prioritas PLN khususnya segmen industri dan
          bisnis dalam mendukung keandalan sistem kelistrikan instalasi milik
          pelanggan (IML) berikut :
        </p>
        <div className="flex items-center justify-between">
          <ul className="text-lg">
            <li className="flex items-center gap-3">
              <Check size={20} className="text-primary" />
              Mapping Data Asset
            </li>
            <li className="flex items-center gap-3">
              <Check size={20} className="text-primary" />
              Pemeliharaan Panel Tegangan Menengah
            </li>
            <li className="flex items-center gap-3">
              <Check size={20} className="text-primary" />
              Pemeliharaan Transformator
            </li>
            <li className="flex items-center gap-3">
              <Check size={20} className="text-primary" />
              Pemeliharaan Panel Tegangan Rendah
            </li>
          </ul>
        </div>
        <p className="text-lg">
          Kami berkomitmen memelihara kesehatan asset kelistrikan sehingga umur
          pakai peralatan maksimal dan mencegah kerusakan/ pemadaman yang
          berdampak pada kerugian bisnis Anda.
        </p>
      </div>
    </section>
  );
}

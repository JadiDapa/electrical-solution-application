import Image from "next/image";

export default function ServiceScheme() {
  return (
    <section
      id="service-scheme"
      className="relative flex flex-col items-center justify-between px-9 py-24 lg:flex-row lg:px-24"
    >
      <div className="relative order-2 flex-1 md:block lg:order-1">
        <figure className="relative z-10 size-[380px] overflow-hidden lg:size-[520px]">
          <Image
            src="/images/service-scheme.png"
            alt="Hero Image"
            fill
            className="object-contain object-center"
          />
        </figure>
      </div>
      <div className="order-1 flex-1 space-y-4 pb-6 lg:order-2">
        <h2 className="border-l-8 border-primary ps-3 text-4xl font-semibold text-foreground md:text-5xl lg:text-6xl">
          Skema Layanan
        </h2>
        <p className="text-end lg:text-start lg:text-lg">
          Berikut adalah garis besar alur skema layanan Electrical Solution yang
          kami tawarkan!
        </p>
        <div className="flex items-center justify-between">
          <ul className="space-y-5">
            <li className="flex items-center gap-5">
              <div className="pr-3 text-6xl font-bold text-primary lg:text-7xl">
                1
              </div>
              <div className="w-full">
                <h4 className="font-semibold text-primary lg:text-lg">
                  Pendataan Asset Pelanggan Prioritas
                </h4>
                <p className="text-sm lg:text-base">
                  Meliputi pendataan asset kelistrikan dari APP Pelanggan, Panel
                  Daya, Trafo Daya, Kabel dan Alat Instrumen/alat kerja berupa
                  jumlah, detail spesifikasi, single line diagram dll
                </p>
              </div>
            </li>
            <li className="flex items-center gap-5">
              <div className="text-6xl font-bold text-primary lg:text-7xl">
                2
              </div>
              <div className="w-full">
                <h4 className="font-semibold text-primary lg:text-lg">
                  Inspeksi Rutin
                </h4>
                <p className="text-sm lg:text-base">
                  Meliputi screening dan inspeksi rutin sesuai dengan kaidah
                  pemeliharaan berbasis asset management
                </p>
              </div>
            </li>
            <li className="flex items-center gap-5">
              <div className="text-6xl font-bold text-primary lg:text-7xl">
                3
              </div>
              <div className="w-full">
                <h4 className="font-semibold text-primary lg:text-lg">
                  Pemeliharaan
                </h4>
                <p className="text-sm lg:text-base">
                  Meliputi pemeliharaan rutin dan pemeliharaan kondisional
                  berdasarkan tingkat health index sesuai dengan kaidah
                  pemeliharaan berbasis asset management
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

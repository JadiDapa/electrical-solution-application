import Image from "next/image";

export default function ServiceScheme() {
  return (
    <section
      id="service-scheme"
      className="relative flex flex-col items-center justify-between px-9 py-24 lg:flex-row lg:px-24"
    >
      <div className="relative flex-1 md:block">
        <figure className="relative z-10 size-[520px] overflow-hidden">
          <Image
            src="/images/service-scheme.png"
            alt="Hero Image"
            fill
            className="object-contain object-center"
          />
        </figure>
      </div>
      <div className="flex-1 space-y-4 pb-6">
        <h2 className="border-l-8 border-primary ps-3 text-6xl font-semibold text-foreground">
          Skema Layanan
        </h2>
        <p className="text-lg">
          Berikut adalah garis besar alur skema layanan Electrical Solution yang
          kami tawarkan!
        </p>
        <div className="flex items-center justify-between">
          <ul className="space-y-5">
            <li className="flex items-center gap-5">
              <div className="pr-3 text-7xl font-bold text-primary">1</div>
              <div className="w-full">
                <h4 className="text-lg font-semibold text-primary">
                  Pendataan Asset Pelanggan Prioritas
                </h4>
                <p>
                  Meliputi pendataan asset kelistrikan dari APP Pelanggan, Panel
                  Daya, Trafo Daya, Kabel dan Alat Instrumen/alat kerja berupa
                  jumlah, detail spesifikasi, single line diagram dll
                </p>
              </div>
            </li>
            <li className="flex items-center gap-5">
              <div className="text-7xl font-bold text-primary">2</div>
              <div className="w-full">
                <h4 className="text-lg font-semibold text-primary">
                  Inspeksi Rutin
                </h4>
                <p>
                  Meliputi screening dan inspeksi rutin sesuai dengan kaidah
                  pemeliharaan berbasis asset management
                </p>
              </div>
            </li>
            <li className="flex items-center gap-5">
              <div className="text-7xl font-bold text-primary">3</div>
              <div className="w-full">
                <h4 className="text-lg font-semibold text-primary">
                  Pemeliharaan
                </h4>
                <p>
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

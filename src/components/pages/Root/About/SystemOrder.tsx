import Image from "next/image";

export default function SystemOrder() {
  return (
    <section
      id="system-order"
      className="relative flex flex-col items-center gap-6 bg-primary/5 px-9 py-24 lg:flex-row lg:gap-12 lg:px-24"
    >
      <div className="flex-1 space-y-4 pb-6">
        <h2 className="border-l-8 border-primary ps-3 text-4xl font-semibold text-foreground md:text-5xl lg:text-6xl">
          Tata Nilai Perusahaan{" "}
        </h2>
        <p className="lg:text-lg">
          PT Haleyora Power merupakan anak perusahaan PT PLN (Persero) yang
          bergerak di bidang Operation & Maintenance pada jaringan Transmisi dan
          Distribusi serta Billing Management sejak 2011.
        </p>
      </div>
      <div className="relative flex-1 md:block">
        <figure className="relative z-30 aspect-video w-[360px] overflow-hidden md:w-[480px]">
          <Image
            src="/images/akhlak.png"
            alt="Akhlak"
            fill
            className="object-contain object-center"
          />
        </figure>
      </div>
    </section>
  );
}

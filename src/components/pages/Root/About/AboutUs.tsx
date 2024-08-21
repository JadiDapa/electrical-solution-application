import Image from "next/image";

export default function AboutUs() {
  return (
    <section
      id="about-us"
      className="relative flex flex-col items-center gap-12 bg-primary/5 px-9 py-24 lg:flex-row lg:px-24"
    >
      <div className="flex-1 space-y-4 pb-6">
        <h2 className="border-l-8 border-primary ps-3 text-4xl font-semibold text-foreground md:text-5xl lg:text-6xl">
          Tentang Kami
        </h2>
        <p className="lg:text-lg">
          PT Haleyora Power merupakan anak perusahaan PT PLN (Persero) yang
          bergerak di bidang Operation & Maintenance pada jaringan Transmisi dan
          Distribusi serta Billing Management sejak 2011.
        </p>
        <p className="lg:text-lg">
          PT Haleyora Power juga mengembangkan produk-produk di luar PLN seperti
          Customer Power Solutions, EV Charging & On Shore Power System (OPS).
        </p>
      </div>
      <div className="relative flex-1 md:block">
        <figure className="relative z-30 aspect-video w-[320px] overflow-hidden lg:w-[480px]">
          <Image
            src="/images/video-placeholder.jpg"
            alt="Hero Image"
            fill
            className="object-contain object-center"
          />
        </figure>
      </div>
    </section>
  );
}

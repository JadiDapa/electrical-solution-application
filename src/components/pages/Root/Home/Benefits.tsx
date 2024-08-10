import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  MdOutlineDiscount,
  MdOutlineMarkEmailRead,
  MdSupportAgent,
} from "react-icons/md";
import { PiArrowsCounterClockwiseBold } from "react-icons/pi";

const benefitData = [
  {
    title: "Cost Efficiency",
    Icon: MdOutlineDiscount,
    description:
      "Optimalisasi biaya pemeliharaan dengan mencegah biaya tidak terduga akibat kerusakan/pemadaman listrik dan memperpanjang umur pakai peralatan.",
  },
  {
    title: "Continue & Reliability",
    Icon: PiArrowsCounterClockwiseBold,
    description:
      "Meningkatkan keandalan sistem kelistrikan dan efisiensi mesin dalam mendukung produktivitas dan profitabilitas proses bisnis Anda.",
  },
  {
    title: "One Stop Solution",
    Icon: MdOutlineMarkEmailRead,
    description:
      "Menyediakan alat kerja/uji lengkap dan tenaga ahli yang siap melayani apapun keluhan serta kebutuhan kelistrikan dengan dukungan pengalaman dan partnership bisnis kami.",
  },
  {
    title: "Contact Center Agent",
    Icon: MdSupportAgent,
    description:
      "Ketersediaan layanan pelanggan yang responsif untuk mengatasi masalah darurat Anda selama 24 Jam.",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="relative space-y-20 px-9 py-24 lg:px-24">
      <div className="flex items-end justify-between">
        <h2 className="border-l-8 border-primary ps-3 text-6xl font-semibold text-foreground">
          Benefits
        </h2>
        <p className="max-w-md text-end">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores iure
          distinctio quisquam!
        </p>
      </div>

      <div className="grid grid-cols-4">
        {benefitData.map((item, index) => (
          <div key={item.title} className="flex">
            {index !== 0 && (
              <Separator
                orientation="vertical"
                className="my-auto h-1/2 w-0.5"
              />
            )}
            <div
              className={cn(
                "space-y-6 px-5",
                index === 0 && "pl-0",
                index === benefitData.length - 1 && "pr-0",
              )}
            >
              <div className="text-primary/70">
                <item.Icon size={80} />
              </div>
              <div className="space-y-3">
                <h4 className="text-2xl font-semibold text-primary">
                  {item.title}
                </h4>
                <p className="text-[15px]">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

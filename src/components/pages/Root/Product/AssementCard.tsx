import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";
import Link from "next/link";

interface Data {
  title: string;
  period: string;
  status: string;
}

interface Menu {
  title: string;
  data: Data[];
}

interface AssementCardProps {
  level: string;
  menu: Menu[];
}

export default function AssementCard({ level, menu }: AssementCardProps) {
  return (
    <div
      key={level}
      className={cn(
        "relative space-y-4 overflow-hidden rounded-2xl border-2 p-6 py-9",
        level === "Silver" && "-translate-y-8 border-primary pt-[52px]",
      )}
    >
      {level === "Silver" && (
        <div className="absolute left-0 top-0 w-full bg-primary text-center text-lg font-semibold text-background">
          Produk Terlaris
        </div>
      )}
      <h3 className="text-3xl font-semibold text-primary">{level}</h3>
      <p>Pilihan standar untuk perusahaan</p>
      <p className="pb-2">
        Rp. <span className="text-5xl font-semibold text-primary">24.990</span>
        /tahun
      </p>
      <Link href={`/order/assement?option=${level.toLowerCase()}`}>
        <Button
          variant="outline"
          className="w-full transition-all duration-300 hover:bg-primary hover:text-background"
        >
          Pilih Paket
        </Button>
      </Link>
      <Separator />
      {menu.map((menu) => (
        <div key={menu.title} className="">
          <h5 className="text-xl font-semibold">{menu.title}</h5>
          <ul className="space-y-1">
            {menu.data.map((data) => (
              <li
                key={data.title}
                className={cn(
                  "flex items-center gap-3",
                  data.status === "false" && "text-slate-400 line-through",
                )}
              >
                {data.status === "true" ? (
                  <Check size={20} className="text-primary" />
                ) : (
                  <Minus size={20} className="text-slate-400" />
                )}
                {data.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

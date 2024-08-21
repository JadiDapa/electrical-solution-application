import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calculator, PencilRuler, Presentation } from "lucide-react";
import Link from "next/link";

export function BEIModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-3 rounded-full px-6">
          <PencilRuler />
          Pilih Opsi Layanan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[580px]">
        <DialogHeader>
          <DialogTitle className="border-l-4 border-primary pl-1 text-3xl">
            Pilih Opsi Layanan
          </DialogTitle>
          <DialogDescription className="text-base">
            Silahkan memilih salah satu metode untuk memesan produk kami!
          </DialogDescription>
          <div className="flex gap-4 pt-6">
            <Link
              href={`/order/build-electrical-installation?option=drawing`}
              className="group flex-1 cursor-pointer space-y-2 rounded-xl border-2 border-primary px-3 py-6 transition-all duration-300 hover:bg-primary hover:text-background"
            >
              <Presentation
                size={32}
                className="text-primary/70 transition-all duration-300 group-hover:text-background"
              />
              <h3 className="text-xl font-medium text-primary transition-all duration-300 group-hover:text-background">
                Mapping & Drawing
              </h3>
              <p className="text-base font-medium">
                Pemetaan asset listrik berupa visualisasi single line diagram
              </p>
            </Link>
            <Link
              href={`/order/build-electrical-installation?option=manual-calculation`}
              className="group flex-1 cursor-pointer space-y-2 rounded-xl border-2 border-primary px-3 py-6 transition-all duration-300 hover:bg-primary hover:text-background"
            >
              <Calculator
                size={32}
                className="text-primary/70 transition-all duration-300 group-hover:text-background"
              />
              <h3 className="text-xl font-medium text-primary transition-all duration-300 group-hover:text-background">
                Manual Calculation
              </h3>
              <p className="text-base font-medium">
                Perhitungan aset listrik dengan menginputkan manual aset yang
                dibutuhkan
              </p>
            </Link>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

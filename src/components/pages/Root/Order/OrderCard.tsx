"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface OrderCardProps {
  name: string;
  price: string;
  orderOption: string | null;
}

export default function OrderCard({
  name,
  price,
  orderOption,
}: OrderCardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div
      className={cn(
        "relative space-y-4 overflow-hidden rounded-2xl border-2 bg-background p-6 py-9",
        orderOption === name.toLowerCase() && "border-4 border-primary",
      )}
    >
      <h3 className="text-3xl font-semibold text-primary">{name}</h3>
      <p>Pilihan standar untuk perusahaan</p>
      <p className="pb-2">
        Rp. <span className="text-5xl font-semibold text-primary">{price}</span>
        /tahun
      </p>

      <Button
        onClick={() => {
          router.push(
            pathname + "?" + createQueryString("option", name.toLowerCase()),
            { scroll: false },
          );
        }}
        variant="outline"
        className={cn(
          "w-full transition-all duration-300",
          orderOption === name.toLowerCase()
            ? "bg-primary text-background hover:bg-secondary hover:text-primary"
            : "hover:bg-primary hover:text-background",
        )}
      >
        {orderOption === name.toLowerCase() ? "Dipilih" : "Ganti Pilihan"}
      </Button>
    </div>
  );
}

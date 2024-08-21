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
        "relative space-y-3 overflow-hidden rounded-2xl border-2 bg-background px-4 py-6 lg:space-y-4 lg:px-6 lg:py-9",
        orderOption === name.toLowerCase() && "border-4 border-primary",
      )}
    >
      <h3 className="text-2xl font-semibold text-primary lg:text-3xl">
        {name}
      </h3>
      <p>Standarize option for your company</p>
      <p className="pb-2">
        Rp.{" "}
        <span className="text-4xl font-semibold text-primary lg:text-[40px]">
          {price}
        </span>
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
        {orderOption === name.toLowerCase() ? "Selected" : "Select"}
      </Button>
    </div>
  );
}

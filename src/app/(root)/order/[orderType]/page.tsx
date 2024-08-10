"use client";

import OrderForm from "@/components/pages/Root/Order/OrderForm";
import OrderHeader from "@/components/pages/Root/Order/OrderHeader";
import SelectOrder from "@/components/pages/Root/Order/SelectOrder";
import { useParams, useSearchParams } from "next/navigation";

export default function Order() {
  const { orderType } = useParams();
  const searchParams = useSearchParams();
  const option = searchParams.get("option");

  return (
    <>
      <OrderHeader orderType={orderType as string} />
      <SelectOrder orderType={orderType as string} orderOption={option} />
      <OrderForm />
    </>
  );
}

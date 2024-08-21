"use client";

import OrderForm from "@/components/pages/Root/Order/OrderForm";
import OrderHeader from "@/components/pages/Root/Order/OrderHeader";
import SelectOrder from "@/components/pages/Root/Order/SelectOrder";
import { useParams, useSearchParams } from "next/navigation";
import BEIForm from "@/components/pages/Root/Order/BEIForm";

export default function Order() {
  const { orderType } = useParams();
  const searchParams = useSearchParams();
  const option = searchParams.get("option");

  const orderOption = [
    {
      level: "bronze",
      price: "100000",
    },
    {
      level: "silver",
      price: "200000",
    },
    {
      level: "gold",
      price: "300000",
    },
  ];

  const orderLevel =
    orderOption.find((order) => order.level === option)?.level || "";
  const orderPrice =
    orderOption.find((order) => order.level === option)?.price || "";

  return (
    <>
      <OrderHeader orderType={orderType as string} orderOption={option} />
      {orderType === "assement" && (
        <>
          <SelectOrder orderType={orderType as string} orderOption={option} />
          <OrderForm orderLevel={orderLevel} orderPrice={orderPrice} />
        </>
      )}
      {orderType === "build-electrical-installation" && (
        <BEIForm
          orderType={orderType as string}
          orderOption={option as string}
        />
      )}
    </>
  );
}

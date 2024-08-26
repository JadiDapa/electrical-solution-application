import { getAllAssements } from "@/lib/network/assement";
import OrderCard from "./OrderCard";
import { useQuery } from "@tanstack/react-query";

interface SelectOrderProps {
  orderType: string;
  orderOption: string | null;
}

export default function SelectOrder({
  orderType,
  orderOption,
}: SelectOrderProps) {
  const { data: assements } = useQuery({
    queryFn: () => getAllAssements(),
    queryKey: ["assements"],
  });

  const assementOption = [
    {
      name: assements?.[0]?.title || "",
      price: Number(assements?.[0]?.price).toLocaleString() || "",
    },
    {
      name: assements?.[1]?.title || "",
      price: Number(assements?.[1]?.price).toLocaleString() || "",
    },
    {
      name: assements?.[2]?.title || "",
      price: Number(assements?.[2]?.price).toLocaleString() || "",
    },
  ];

  return (
    <section
      id="select-order"
      className="relative items-center gap-12 space-y-6 bg-primary/5 px-9 py-6 lg:px-24"
    >
      <h2 className="border-l-8 border-primary ps-3 text-3xl font-semibold lg:text-4xl">
        Select Preferable Option
      </h2>
      <div className="mt-12 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {assementOption.map((item) => (
          <OrderCard
            key={item.name}
            name={item.name}
            price={item.price}
            orderOption={orderOption}
          />
        ))}
      </div>
    </section>
  );
}

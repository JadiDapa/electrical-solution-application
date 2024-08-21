import OrderCard from "./OrderCard";

const assementOption = [
  {
    name: "Bronze",
    price: "17,500,000",
  },
  {
    name: "Silver",
    price: "22,500,000",
  },
  {
    name: "Gold",
    price: "35,000,000",
  },
];

const BEIOption = [
  {
    name: "Bronze",
    price: "17,500,000",
  },
  {
    name: "Silver",
    price: "22,500,000",
  },
  {
    name: "Gold",
    price: "35,000,000",
  },
];

interface SelectOrderProps {
  orderType: string;
  orderOption: string | null;
}

export default function SelectOrder({
  orderType,
  orderOption,
}: SelectOrderProps) {
  const options = orderType === "assement" ? assementOption : BEIOption;
  return (
    <section
      id="select-order"
      className="relative items-center gap-12 space-y-6 bg-primary/5 px-9 py-6 lg:px-24"
    >
      <h2 className="border-l-8 border-primary ps-3 text-3xl font-semibold lg:text-4xl">
        Select Preferable Option
      </h2>
      <div className="mt-12 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {options.map((item) => (
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

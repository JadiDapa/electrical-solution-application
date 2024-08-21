import { Boxes } from "lucide-react";

interface OrderHeaderProps {
  orderType: string;
  orderOption?: string | null;
}

export default function OrderHeader({
  orderType,
  orderOption,
}: OrderHeaderProps) {
  const type =
    orderOption === "manual-calculation" ? "(Manual Calculation)" : "(Drawing)";

  const orderName =
    orderType === "assement"
      ? "Asset Management"
      : "Build Electrical Installation " + type;

  return (
    <section
      id="order-header"
      className="relative items-center gap-12 space-y-6 bg-primary/5 px-9 pb-6 pt-32 lg:px-24"
    >
      <h1 className="border-primary text-center text-5xl font-semibold text-primary lg:text-6xl">
        Product Order
      </h1>
      <p className="mx-auto text-center text-sm lg:max-w-3xl lg:text-base">
        Lorem ipsum dolor sit, amet consectetur adipis icing elit. Dolore, rem,
        molestiae dicta neque at perspiciatis expedita numquam itaque non,
        cupiditate esse.
      </p>
      <div className="rounded-xl bg-white p-2 lg:p-3">
        <div className="flex items-center gap-4 rounded-lg border-2 border-dashed p-2 text-xl font-semibold lg:p-3 lg:text-2xl">
          <Boxes strokeWidth={1.5} className="size-8 text-primary lg:size-10" />
          <h2>
            Products : <span className="text-primary">{orderName}</span>
          </h2>
        </div>
      </div>
    </section>
  );
}

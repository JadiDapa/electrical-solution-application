import { Calculator, ReceiptText } from "lucide-react";

interface OfferHeaderProps {
  projectId: string;
  projectType: string;
}

export default function OfferHeader({
  projectId,
  projectType,
}: OfferHeaderProps) {
  return (
    <section
      id="order-header"
      className="relative items-center gap-12 space-y-6 bg-primary/5 px-9 pb-6 pt-32 lg:px-24"
    >
      <h1 className="border-primary text-center text-6xl font-semibold text-primary">
        Project Offering
      </h1>
      <p className="mx-auto max-w-3xl text-center">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, rem,
        molestiae dicta neque at perspiciatis expedita numquam itaque non,
        cupiditate esse.
      </p>
      <div className="rounded-xl bg-white p-3">
        <div className="flex items-center gap-4 rounded-lg border-2 border-dashed p-3 text-2xl font-semibold">
          <ReceiptText size={40} strokeWidth={1.5} className="text-primary" />
          <h2>
            {projectType} : {projectId}
          </h2>
        </div>
      </div>
    </section>
  );
}

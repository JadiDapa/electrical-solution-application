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
      className="relative items-center gap-12 space-y-6 bg-primary/5 px-6 pb-6 pt-32 lg:px-24"
    >
      <h1 className="border-primary text-center text-4xl font-semibold text-primary md:text-5xl lg:text-6xl">
        Project Offering
      </h1>
      <p className="mx-auto max-w-3xl text-center text-sm lg:text-base">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, rem,
        molestiae
      </p>
      <div className="rounded-xl bg-white p-2 lg:p-3">
        <div className="flex items-center gap-4 rounded-lg border-2 border-dashed p-2 text-lg lg:p-3 lg:text-2xl lg:font-semibold">
          <ReceiptText
            size={40}
            strokeWidth={1.5}
            className="hidden text-primary lg:block"
          />
          <div>
            {projectType} : {projectId}
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

interface ComponentCardProps {
  image: string;
  title: string;
  totalVariant: number | string;
}

export default function ComponentCard({
  image,
  title,
  totalVariant,
}: ComponentCardProps) {
  return (
    <div className="flex items-center gap-6">
      <figure className="relative size-20 overflow-hidden rounded-xl border-2">
        <Image
          src={image}
          alt="Trafo Image"
          fill
          className="object-cover object-center"
        />
      </figure>
      <div className="space-y-2 text-start">
        <p className="text-xl font-semibold">{title}</p>
        <p className="text-sm font-medium">{totalVariant} Variants</p>
      </div>
    </div>
  );
}

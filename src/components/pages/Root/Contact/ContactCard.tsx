import { Separator } from "@/components/ui/separator";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { IconType } from "react-icons/lib";

interface ContactCardProps {
  index: number;
  Icon: IconType | LucideIcon;
  title: string;
  description: string;
  content: string | ReactNode;
}

export default function ContactCard({
  index,
  Icon,
  title,
  description,
  content,
}: ContactCardProps) {
  return (
    <div className="flex flex-1 flex-col items-center gap-3 rounded-xl bg-background bg-white p-5 shadow-lg">
      <div className="flex size-20 items-center justify-center rounded-full bg-secondary">
        <Icon size={40} strokeWidth={1.4} className="text-primary" />
      </div>
      <div className="space-y-1 text-center">
        <div className="text-lg font-bold">{title}</div>
        <div className="">{description}</div>
      </div>
      <Separator />
      <div className="text-center font-bold">{content}</div>
    </div>
  );
}

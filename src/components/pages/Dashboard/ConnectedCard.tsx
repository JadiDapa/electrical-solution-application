import { LucideIcon } from "lucide-react";

interface ConnectedCardProps {
  title: string;
  value: string | number;
  Icon: LucideIcon;
  detail?: string;
  bgColor: string;
  textColor: string;
}

const ConnectedCard: React.FC<ConnectedCardProps> = ({
  title,
  value,
  Icon,
  detail,
  bgColor,
  textColor,
}) => {
  return (
    <>
      <div className="hidden w-full lg:flex">
        <BaseConnectedCard
          title={title}
          value={value}
          detail={detail}
          Icon={Icon}
          bgColor={bgColor}
          textColor={textColor}
        />
      </div>

      <div className="flex w-full lg:hidden">
        <SmallConnectedCard
          title={title}
          value={value}
          detail={detail}
          Icon={Icon}
          bgColor={bgColor}
          textColor={textColor}
        />
      </div>
    </>
  );
};

export default ConnectedCard;

export const BaseConnectedCard: React.FC<ConnectedCardProps> = ({
  title,
  value,
  Icon,
  detail,
  bgColor,
  textColor,
}) => {
  return (
    <div className="flex w-full justify-between px-6">
      <div className="flex flex-col gap-2">
        <div className="">{title}</div>
        <div className="text-2xl">{value}</div>
        <div className="text-sm font-light">{detail}</div>
      </div>
      <div
        className="flex h-10 w-10 items-center justify-center rounded-md"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <Icon />
      </div>
    </div>
  );
};

export const SmallConnectedCard: React.FC<ConnectedCardProps> = ({
  title,
  value,
  Icon,
  detail,
  bgColor,
  textColor,
}) => {
  return (
    <div className="flex w-full justify-between px-6 py-4">
      <div className="flex items-center gap-4">
        <div
          className="flex size-10 items-center justify-center rounded-md text-2xl"
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          <Icon />
        </div>
        <div className="flex flex-col">
          <div>{title}</div>
          <div className="text-sm font-light">{detail}</div>
        </div>
      </div>
      <div className="">
        <div className="text-2xl">{value}</div>
      </div>
    </div>
  );
};

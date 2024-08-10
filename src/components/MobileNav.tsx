import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  navItems: {
    name: string;
    path: string;
  }[];
};

export default function NavbarMobile({ navItems }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="flex duration-300 hover:bg-black/20 hover:text-white lg:hidden"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="font-inter">
        <div className="mt-10 text-sm uppercase">
          {navItems.map((item, index) => (
            <div key={item.path}>
              <SheetClose asChild>
                <Link
                  key={item.path}
                  href={item.path}
                  className="w-full hover:text-primary"
                >
                  {item.name}
                </Link>
              </SheetClose>

              <Separator
                className={cn(`mt-2`, {
                  hidden: index === navItems.length - 1,
                })}
              />
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

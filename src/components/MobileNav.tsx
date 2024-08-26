import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogIn, LogOut, Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type Props = {
  links: {
    name: string;
    path: string;
  }[];
  isLogin?: string;
  handleLogout: () => void;
};

export default function NavbarMobile({ links, isLogin, handleLogout }: Props) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={28} />
      </SheetTrigger>
      <SheetContent side={"left"} className="bg-background">
        <SheetHeader>
          <SheetTitle className="flex w-full items-center justify-center gap-3 pt-6">
            <figure className="relative h-12 w-40">
              <Image
                src="/images/logo-pln-hp.png"
                fill
                className="object-contain object-center"
                alt="logo"
              />
            </figure>
          </SheetTitle>
          <SheetDescription className="font-semi text-primary">
            Electrical Solution Application
          </SheetDescription>
          <div className="flex flex-col pt-6">
            <div className="flex flex-col gap-6">
              {links.map((link) => (
                <SheetClose asChild key={link.name} className="text-start">
                  <Link
                    href={link.path}
                    className={cn(
                      "text-start text-xl text-primary",
                      pathname === link.path && "font-semibold underline",
                    )}
                  >
                    {link.name}
                  </Link>
                </SheetClose>
              ))}
            </div>

            {isLogin ? (
              <div className="mt-8 flex gap-2">
                <Link href="/dashboard" className="w-full">
                  <Button className="w-full rounded-full border p-2 hover:border-primary hover:bg-transparent hover:text-primary">
                    Dashboard
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full rounded-full p-2 text-primary hover:border-primary hover:bg-primary hover:text-white"
                >
                  Log Out
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  className="mt-8 flex w-full items-center gap-3 rounded-full border-2 border-primary bg-transparent px-9 text-base text-primary hover:bg-primary hover:text-background"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

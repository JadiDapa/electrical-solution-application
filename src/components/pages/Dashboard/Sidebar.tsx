"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Box,
  ChevronRight,
  CircleDashed,
  FolderOpenDot,
  Home,
  NotepadText,
  SquareChartGantt,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const userLink = [
  {
    name: "Dashboard",
    url: "/dashboard",
    Icon: Home,
  },
  {
    name: "Asset Managemet",
    url: "/dashboard/asset-management",
    Icon: SquareChartGantt,
  },
  {
    name: "Build Electrical Installation",
    url: "/dashboard/build-electrical-installation",
    Icon: NotepadText,
  },
];

const unitLink = [
  {
    name: "Assigned Projects",
    url: "/dashboard/assigned-projects",
    Icon: Wrench,
  },
];

const adminLink = [
  {
    name: "Projects",
    Icon: FolderOpenDot,
    children: [
      {
        name: "All Project",
        url: "/dashboard/projects/all",
      },
      {
        name: "Unit Handler",
        url: "/dashboard/projects/unit-handler",
      },
    ],
  },
  {
    name: "Users",
    url: "/dashboard/users",
    Icon: Users,
  },
  {
    name: "Materials",
    Icon: Box,
    children: [
      {
        name: "Main",
        url: "/dashboard/materials/main",
      },
      {
        name: "Variant",
        url: "/dashboard/materials/variant",
      },
    ],
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const { data } = useSession();
  const userRole = data?.user.role;

  return (
    <>
      <aside
        className={cn(
          "box-shadow fixed z-50 min-h-screen w-[280px] overflow-hidden border-r bg-white p-4 transition-all duration-500",
          isOpen ? "translate-x-0" : "max-lg:-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <Link
            href={"/dashboard"}
            className="relative mt-2 flex h-12 w-40 items-center gap-4"
          >
            <Image
              src="/images/logo-pln-hp.png"
              alt="Logo"
              className="object-contain object-center"
              fill
            />
          </Link>
          <X
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden"
            size={24}
            strokeWidth={1.5}
          />
        </div>

        <ScrollArea className="mt-4 h-[85vh]">
          <Accordion type="single" className="flex flex-col gap-2" collapsible>
            <p className="px-5 pt-3 text-lg font-semibold text-primary">
              User Menu
            </p>
            {userLink.map((item) => (
              <div key={item.url}>
                <Link
                  key={item.url}
                  href={item.url}
                  className={cn(
                    "mt-1 flex w-full items-center justify-between rounded-md px-5 py-2.5 duration-300",
                    pathname === item.url
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "hover:bg-slate-100",
                  )}
                >
                  <div className={`"justify-center flex items-center gap-5`}>
                    <item.Icon strokeWidth={1.5} size={20} />
                    <div className="text-lg font-medium">{item.name}</div>
                  </div>
                </Link>
              </div>
            ))}
            {(userRole === "admin" || userRole === "unit") && (
              <>
                <p className="px-5 pt-3 text-lg font-semibold text-primary">
                  Unit Menu
                </p>
                {unitLink.map((item) => (
                  <div key={item.url}>
                    <Link
                      key={item.url}
                      href={item.url}
                      className={cn(
                        "mt-1 flex w-full items-center justify-between rounded-md px-5 py-2.5 duration-300",
                        pathname === item.url
                          ? "bg-primary/10 text-primary shadow-sm"
                          : "hover:bg-slate-100",
                      )}
                    >
                      <div
                        className={`"justify-center flex items-center gap-5`}
                      >
                        <item.Icon strokeWidth={1.5} size={20} />
                        <div className="text-lg font-medium">{item.name}</div>
                      </div>
                    </Link>
                  </div>
                ))}
              </>
            )}
            {userRole === "admin" && (
              <>
                <p className="px-5 pt-3 text-lg font-semibold text-primary">
                  Admin Menu
                </p>
                {adminLink.map((item) => (
                  <div key={item.url}>
                    {item.children ? (
                      <AccordionItem
                        key={item.name}
                        value={item.name}
                        className="m-0 border-none p-0"
                      >
                        <AccordionTrigger
                          className={`flex w-full items-center justify-between rounded-md px-5 py-2.5 duration-300 hover:bg-slate-100`}
                        >
                          <div
                            className={`"justify-center flex items-center gap-5`}
                          >
                            <item.Icon strokeWidth={1.5} size={20} />
                            <div className="text-lg font-medium">
                              {item.name}
                            </div>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="ml-2 mt-2 flex flex-col gap-2">
                          {item.children.map((subitem, subitemIndex) => (
                            <div key={subitemIndex}>
                              <div className="w-full text-left">
                                <Link
                                  key={subitem.url}
                                  href={subitem.url}
                                  className={cn(
                                    "mt-1 flex w-full items-center justify-between rounded-md px-5 py-2.5 duration-300",
                                    pathname === subitem.url
                                      ? "bg-primary/10 text-primary shadow-sm"
                                      : "hover:bg-slate-100",
                                  )}
                                >
                                  <div
                                    className={`"justify-center flex items-center gap-5`}
                                  >
                                    <CircleDashed strokeWidth={1.5} size={20} />
                                    <div className="text-lg font-medium">
                                      {subitem.name}
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <Link
                        key={item.url}
                        href={item.url}
                        className={cn(
                          "mt-1 flex w-full items-center justify-between rounded-md px-5 py-2.5 duration-300",
                          pathname === item.url
                            ? "bg-primary/10 text-primary shadow-sm"
                            : "hover:bg-slate-100",
                        )}
                      >
                        <div
                          className={`"justify-center flex items-center gap-5`}
                        >
                          <item.Icon strokeWidth={1.5} size={20} />
                          <div className="text-lg font-medium">{item.name}</div>
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </>
            )}
          </Accordion>
        </ScrollArea>
      </aside>
      {!isOpen && (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 z-50 grid size-8 place-items-center rounded-e-lg bg-white text-primary lg:hidden"
        >
          <ChevronRight size={24} strokeWidth={1.5} />
        </div>
      )}
    </>
  );
}

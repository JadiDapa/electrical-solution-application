import { ReactNode } from "react";
import Sidebar from "@/components/pages/Dashboard/Sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <section className="flex min-h-screen w-full overflow-hidden border bg-primary/5 lg:gap-12">
      <div>
        <Sidebar />
      </div>

      <main className="w-full lg:ml-[232px]">
        <div className="p-6">{children}</div>
      </main>
    </section>
  );
}

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import Sidebar from "@/components/pages/Dashboard/Sidebar";
import { auth } from "@/lib/auth";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

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

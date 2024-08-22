import DashboardHeader from "@/components/pages/Dashboard/DashboardHeader";
import ProjectTable from "@/components/pages/Dashboard/Projects/ProjectTable";
import { Button } from "@/components/ui/button";
import { userProjectcolumn } from "@/lib/column/user-project-column";
import { getProjectsByUserId } from "@/lib/network/project";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();
  const userId = session?.user.id;
  const projects = await getProjectsByUserId(userId || "");

  return (
    <section className="flex w-full flex-col gap-4 lg:gap-6">
      <DashboardHeader />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="relative col-span-1 h-52 space-y-3 overflow-hidden rounded-lg bg-white p-6">
          <Image
            src="/images/assement.jpg"
            alt="assement image"
            fill
            className="z-0 object-cover object-center brightness-50"
          />
          <p className="relative z-10 h-8 text-2xl font-semibold text-background">
            Asset Management
          </p>
          <div className="absolute bottom-6 right-6 z-10 flex gap-3">
            <Link href="/dashboard/asset-management">
              <Button size="sm">Projects</Button>
            </Link>
            <Link href="/order/assement">
              <Button
                size="sm"
                className="border-background bg-background text-primary"
              >
                Create
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative col-span-1 h-52 space-y-3 overflow-hidden rounded-lg bg-white p-6">
          <Image
            src="/images/drawing.png"
            alt="drawing image"
            fill
            className="z-0 object-cover object-center brightness-50"
          />
          <div className="relative z-10 text-background">
            <p className="text-sm">Build Electrical Installation</p>
            <p className="text-2xl font-semibold">Mapping & Drawing</p>
          </div>
          <div className="absolute bottom-6 right-6 z-10 flex gap-3">
            <Link href="/dashboard/build-electrical-installation">
              <Button size="sm">Projects</Button>
            </Link>
            <Link href="/order/assement">
              <Button
                size="sm"
                className="border-background bg-background text-primary"
              >
                Create
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative col-span-1 h-52 space-y-3 overflow-hidden rounded-lg bg-white p-6">
          <Image
            src="/images/auth-image.jpeg"
            alt="assement image"
            fill
            className="z-0 object-cover object-center brightness-50"
          />
          <div className="relative z-10 text-background">
            <p className="text-sm">Build Electrical Installation</p>
            <p className="text-2xl font-semibold">Manual Calculation</p>
          </div>
          <div className="absolute bottom-6 right-6 z-10 flex gap-3">
            <Link href="/dashboard/build-electrical-installation">
              <Button size="sm">Projects</Button>
            </Link>
            <Button
              size="sm"
              className="border-background bg-background text-primary"
            >
              Create
            </Button>
          </div>
        </div>
      </div>

      <ProjectTable
        columns={userProjectcolumn}
        data={projects}
        total={projects.length}
        title="Your Recent Projects"
      />
    </section>
  );
}

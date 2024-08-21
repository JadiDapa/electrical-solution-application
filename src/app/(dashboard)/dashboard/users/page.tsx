import ConnectedCard from "@/components/pages/Dashboard/ConnectedCard";
import DashboardHeader from "@/components/pages/Dashboard/DashboardHeader";
import UserTable from "@/components/pages/Dashboard/UserTable";
import { userColumn } from "@/lib/column/user-column";
import { getAllUsers } from "@/lib/network/user";
import {
  BarChart2,
  SquareUserRound,
  UserRound,
  UserRoundCog,
  Users,
} from "lucide-react";

export default async function UsersDashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const users = await getAllUsers();

  const cardData = [
    {
      title: "Total of Users",
      value: users?.length,
      Icon: Users,
      bgColor: "#add362",
      textColor: "#fff",
    },
    {
      title: "Admin Role",
      value: users?.filter((item) => item.role === "admin").length,
      Icon: UserRoundCog,
      bgColor: "#CE6DED",
      textColor: "#ffffff",
    },
    {
      title: "Unit Role",
      value: users?.filter((item) => item.role === "unit").length,
      Icon: SquareUserRound,
      bgColor: "#ed6d6d",
      textColor: "#ffffff",
    },
    {
      title: "User Role",
      value: users?.filter((item) => item.role === "user").length,
      Icon: UserRound,
      bgColor: "#EDA76D",
      textColor: "#ffffff",
    },
  ];

  return (
    <section className="flex w-full flex-col gap-4 py-6 lg:gap-6">
      {/* Header Title */}
      <DashboardHeader title="User" subtitle="User List" />

      {/* Data Statistic */}
      <div className="box-shadow flex flex-col divide-y rounded-md bg-white py-6 lg:flex-row lg:divide-x lg:divide-y-0">
        {cardData.map((list) => (
          <ConnectedCard
            key={list.title}
            title={list.title}
            value={list.value}
            Icon={list.Icon}
            bgColor={list.bgColor}
            textColor={list.textColor}
          />
        ))}
      </div>

      <UserTable columns={userColumn} data={users} total={users.length} />
    </section>
  );
}

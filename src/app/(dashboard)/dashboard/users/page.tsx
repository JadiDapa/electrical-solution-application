"use client";

import ConnectedCard from "@/components/pages/Dashboard/ConnectedCard";
import DashboardHeader from "@/components/pages/Dashboard/DashboardHeader";
import UserTable from "@/components/pages/Dashboard/UserTable";
import { userColumn } from "@/lib/column/user-column";
import { getAllUsers } from "@/lib/network/user";
import { useQuery } from "@tanstack/react-query";
import { SquareUserRound, UserRound, UserRoundCog, Users } from "lucide-react";

export default function UsersDashboard() {
  const { data: users } = useQuery({
    queryFn: () => getAllUsers(),
    queryKey: ["users"],
  });

  const cardData = [
    {
      title: "Total of Users",
      value: users?.length || 0,
      Icon: Users,
      bgColor: "#add362",
      textColor: "#fff",
    },
    {
      title: "Admin Role",
      value: users?.filter((item) => item.role === "admin").length || 0,
      Icon: UserRoundCog,
      bgColor: "#CE6DED",
      textColor: "#ffffff",
    },
    {
      title: "Unit Role",
      value: users?.filter((item) => item.role === "unit").length || 0,
      Icon: SquareUserRound,
      bgColor: "#ed6d6d",
      textColor: "#ffffff",
    },
    {
      title: "User Role",
      value: users?.filter((item) => item.role === "user").length || 0,
      Icon: UserRound,
      bgColor: "#EDA76D",
      textColor: "#ffffff",
    },
  ];

  if (users) {
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

        <UserTable
          columns={userColumn}
          data={users}
          total={users.length || 0}
        />
      </section>
    );
  }
}

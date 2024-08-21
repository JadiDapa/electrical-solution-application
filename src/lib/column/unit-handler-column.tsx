"use client";

import { ColumnDef } from "@tanstack/react-table";
import "date-fns";
import ColumnSorter from "@/components/pages/Dashboard/ColumnSorter";
import { formatDate } from "../utils/formatter";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  EllipsisVerticalIcon,
  Eye,
  Pencil,
  SquareUserRound,
  Trash,
  User,
  UserRound,
  UserRoundCog,
} from "lucide-react";
import { UserType } from "../type/user";
import UpdateUserModal from "@/components/pages/Dashboard/Users/UpdateUserModal";
import DeleteModal from "@/components/pages/Dashboard/DeleteModal";
import { deleteUser } from "../network/user";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const unitHandlerColumn: ColumnDef<UserType>[] = [
  {
    accessorKey: "name",
    accessorFn: (row) => row.name,
    header: ({ column }) => (
      <div className="pl-4">
        <ColumnSorter column={column} header="NAME" />
      </div>
    ),
    cell: ({ getValue }) => <div className="ml-4">{getValue() as string}</div>,
  },
  {
    accessorKey: "handled",
    accessorFn: (row) => row._count?.UnitProjects,
    header: ({ column }) => <ColumnSorter column={column} header="HANDLED" />,
    cell: ({ getValue }) => (
      <div className="text-xl">{getValue() as number}</div>
    ),
  },
  {
    accessorKey: "created",
    accessorFn: (row) => row._count?.UserProjects,
    header: ({ column }) => <ColumnSorter column={column} header="CREATED" />,
    cell: ({ getValue }) => (
      <div className="text-xl">{getValue() as number}</div>
    ),
  },
  {
    accessorKey: "action",
    header: ({ column }) => <ColumnSorter column={column} header="ACT" />,
    cell: ({ row }) => (
      <Link href={`/dashboard/projects/unit-handler/${row.original.id}`}>
        <Button className="relative max-w-fit rounded-full px-5" size="sm">
          See Projects
        </Button>
      </Link>
    ),
  },
];

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

export const userColumn: ColumnDef<UserType>[] = [
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
    accessorKey: "email",
    accessorFn: (row) => row.email,
    header: ({ column }) => <ColumnSorter column={column} header="EMAIL" />,
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorKey: "role",
    accessorFn: (row) => row.role,
    header: ({ column }) => <ColumnSorter column={column} header="ROLE" />,
    cell: ({ getValue }) => {
      if (getValue() === "user") {
        return (
          <div className="flex items-center gap-2 font-semibold text-[#add362] lg:text-base">
            <UserRound className="hidden text-xl lg:block" />
            User
          </div>
        );
      }
      if (getValue() === "unit") {
        return (
          <div className="flex items-center gap-2 font-semibold text-[#EDA76D] lg:text-base">
            <SquareUserRound className="hidden text-xl lg:block" />
            Unit
          </div>
        );
      }
      if (getValue() === "admin") {
        return (
          <div className="flex items-center gap-2 font-semibold text-[#CE6DED] lg:text-base">
            <UserRoundCog className="hidden text-xl lg:block" />
            Admin
          </div>
        );
      }
    },
  },
  {
    accessorKey: "projects",
    accessorFn: (row) => row._count?.UserProjects,
    header: ({ column }) => <ColumnSorter column={column} header="PROJECTS" />,
    cell: ({ getValue }) => (
      <div className="text-xl">{getValue() as number}</div>
    ),
  },
  {
    accessorKey: "date",
    accessorFn: (row) => row.createdAt,
    header: ({ column }) => <ColumnSorter column={column} header="DATE" />,
    cell: ({ getValue }) => <div>{formatDate(getValue() as string)}</div>,
  },
  {
    accessorKey: "action",
    header: ({ column }) => <ColumnSorter column={column} header="ACT" />,
    cell: ({ row }) => (
      <div className="relative max-w-fit">
        <Popover>
          <PopoverTrigger>
            <EllipsisVerticalIcon strokeWidth={1.5} />
          </PopoverTrigger>
          <PopoverContent className="absolute -right-4 bottom-0 flex max-w-fit gap-3 px-3 py-1 text-primary">
            <Eye size={20} className="cursor-pointer" />

            <UpdateUserModal user={row.original}>
              <Pencil size={20} className="cursor-pointer" />
            </UpdateUserModal>
            <DeleteModal
              params={row.original.id}
              deleteFunction={deleteUser}
              queryKey="users"
            />
          </PopoverContent>
        </Popover>
      </div>
    ),
  },
];

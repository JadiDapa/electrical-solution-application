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
import { EllipsisVerticalIcon, Eye, Pencil } from "lucide-react";
import RowNumber from "@/components/pages/Dashboard/RowNumber";
import DeleteModal from "@/components/pages/Dashboard/DeleteModal";
import { ProjectType } from "../type/project";
import { deleteProject } from "../network/project";
import Link from "next/link";
import ProjectStatus from "@/components/pages/Dashboard/ProjectStatus";
import ProjectPrice from "@/components/pages/Dashboard/ProjectPrice";
import ProjectEvidences from "@/components/pages/Dashboard/ProjectEvidences";

export const projectColumn: ColumnDef<ProjectType>[] = [
  {
    accessorKey: "id",
    accessorFn: (row) => row.id,
    header: ({ column }) => (
      <div className="pl-4">
        <ColumnSorter column={column} header="#" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="ml-4 text-primary">
        <RowNumber rowIndex={row.index} />
      </div>
    ),
  },
  {
    accessorKey: "name",
    accessorFn: (row) => row.name,
    header: ({ column }) => <ColumnSorter column={column} header="USERNAME" />,
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorKey: "type",
    accessorFn: (row) => row.type,
    header: ({ column }) => <ColumnSorter column={column} header="TYPE" />,
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorKey: "option",
    accessorFn: (row) => row.level,
    header: ({ column }) => <ColumnSorter column={column} header="OPTION" />,
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorKey: "needs",
    accessorFn: (row) => row.needs,
    header: ({ column }) => <ColumnSorter column={column} header="NEEDS" />,
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorKey: "createdAt",
    accessorFn: (row) => row.createdAt,
    header: ({ column }) => <ColumnSorter column={column} header="DATE" />,
    cell: ({ getValue }) => <div>{formatDate(getValue() as string)}</div>,
  },
  {
    accessorKey: "price",
    accessorFn: (row) => Number(row.price),
    header: ({ column }) => <ColumnSorter column={column} header="PRICE" />,
    cell: ({ row }) => <ProjectPrice project={row.original} />,
  },
  {
    accessorKey: "status",
    accessorFn: (row) => row.status,
    header: ({ column }) => <ColumnSorter column={column} header="STATUS" />,
    cell: ({ row }) => <ProjectStatus project={row.original} />,
  },
  {
    accessorKey: "evidence",
    accessorFn: (row) => row.evidence,
    header: ({ column }) => <ColumnSorter column={column} header="EVIDANCE" />,
    cell: ({ row }) => <ProjectEvidences project={row.original} />,
  },
  {
    accessorKey: "action",
    header: ({ column }) => <ColumnSorter column={column} header="ACT" />,
    cell: ({ row }) => {
      if (row.original.type === "assement") {
        return (
          <Link
            href={`/invoice/asset-management/${row.original.id}`}
            className="rounded-full bg-primary px-3 py-1 text-background"
          >
            Visit
          </Link>
        );
      } else if (row.original.level === "Drawing") {
        return (
          <Link
            href={`/drawing/${row.original.id}`}
            className="rounded-full bg-primary px-3 py-1 text-background"
          >
            Visit
          </Link>
        );
      } else if (row.original.level === "Manual Calculation") {
        return (
          <Link
            href={`/manual-calculation/${row.original.id}`}
            className="rounded-full bg-primary px-3 py-1 text-background"
          >
            Visit
          </Link>
        );
      }
    },
  },
];

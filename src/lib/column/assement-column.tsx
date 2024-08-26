"use client";

import { ColumnDef } from "@tanstack/react-table";
import "date-fns";
import ColumnSorter from "@/components/pages/Dashboard/ColumnSorter";
import { AssementType } from "../type/assement";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisVerticalIcon, Pencil } from "lucide-react";
import RowNumber from "@/components/pages/Dashboard/RowNumber";
import UpdateAssementModal from "@/components/pages/Dashboard/Assements/UpdateAssementModal";

export const assementColumn: ColumnDef<AssementType>[] = [
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
    accessorKey: "title",
    accessorFn: (row) => row.title,
    header: ({ column }) => <ColumnSorter column={column} header="TITLE" />,
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorKey: "price",
    accessorFn: (row) => row.price,
    header: ({ column }) => <ColumnSorter column={column} header="PRICE" />,
    cell: ({ getValue }) => (
      <div>Rp {Number(getValue() as number).toLocaleString()}</div>
    ),
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
            <UpdateAssementModal assement={row.original}>
              <Pencil size={20} className="cursor-pointer" />
            </UpdateAssementModal>
          </PopoverContent>
        </Popover>
      </div>
    ),
  },
];

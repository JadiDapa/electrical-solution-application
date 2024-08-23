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
import { MaterialVariantType } from "../type/material-variant";
import UpdateMaterialVariantModal from "@/components/pages/Dashboard/Material/Variant/UpdateMaterialVariantModal";
import { deleteMaterialVariant } from "../network/material-variant";

export const materialVariantColumn: ColumnDef<MaterialVariantType>[] = [
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
    header: ({ column }) => <ColumnSorter column={column} header="VARIANT" />,
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorKey: "material",
    accessorFn: (row) => row.Material.name,
    header: ({ column }) => <ColumnSorter column={column} header="MAIN" />,
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorKey: "unit",
    accessorFn: (row) => row.unit,
    header: ({ column }) => <ColumnSorter column={column} header="UNIT" />,
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorKey: "price",
    accessorFn: (row) => row.price,
    header: ({ column }) => <ColumnSorter column={column} header="PRICE" />,
    cell: ({ getValue }) => (
      <div>{"Rp " + Number(getValue()).toLocaleString("en-EN")}</div>
    ),
  },
  {
    accessorKey: "service",
    accessorFn: (row) => row.service,
    header: ({ column }) => <ColumnSorter column={column} header="SERVICE" />,
    cell: ({ getValue }) => (
      <div>{"Rp " + Number(getValue()).toLocaleString("en-EN")}</div>
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

            <UpdateMaterialVariantModal data={row.original}>
              <Pencil size={20} className="cursor-pointer" />
            </UpdateMaterialVariantModal>
            <DeleteModal
              params={row.original.id}
              deleteFunction={deleteMaterialVariant}
              queryKey="material-variants"
            />
          </PopoverContent>
        </Popover>
      </div>
    ),
  },
];

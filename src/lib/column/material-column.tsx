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
import { EllipsisVerticalIcon, Eye, Pencil, Trash } from "lucide-react";
import RowNumber from "@/components/pages/Dashboard/RowNumber";
import Link from "next/link";
import { MaterialType } from "../type/material";
import Image from "next/image";
import UpdateMaterialModal from "@/components/pages/Dashboard/Material/UpdateMaterialModal";
import { deleteMaterial } from "../network/material";
import DeleteModal from "@/components/pages/Dashboard/DeleteModal";

export const materialColumn: ColumnDef<MaterialType>[] = [
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
    accessorKey: "image",
    accessorFn: (row) => row.image,
    header: ({ column }) => <ColumnSorter column={column} header="GAMBAR" />,
    cell: ({ getValue }) => (
      <figure className="relative size-32 overflow-hidden rounded-md border">
        <Image
          src={getValue() as string}
          fill
          className="object-contain object-center"
          alt={getValue() as string}
        />
      </figure>
    ),
  },
  {
    accessorKey: "name",
    accessorFn: (row) => row.name,
    header: ({ column }) => <ColumnSorter column={column} header="NAMA" />,
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorKey: "slug",
    accessorFn: (row) => row.slug,
    header: ({ column }) => <ColumnSorter column={column} header="SLUG" />,
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorKey: "variant",
    accessorFn: (row) => row._count.MaterialVariant,
    header: ({ column }) => <ColumnSorter column={column} header="VARIANT" />,
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorKey: "date",
    accessorFn: (row) => row.createdAt,
    header: ({ column }) => <ColumnSorter column={column} header="TANGGAL" />,
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

            <UpdateMaterialModal data={row.original}>
              <Pencil size={20} className="cursor-pointer" />
            </UpdateMaterialModal>
            <DeleteModal
              params={row.original.id}
              deleteFunction={deleteMaterial}
              queryKey="materials"
            />
          </PopoverContent>
        </Popover>
      </div>
    ),
  },
];

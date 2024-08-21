"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Check,
  ChevronsUpDown,
  CirclePlus,
  Command,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CreateMaterialVariantModal from "./CreateMaterialVariantModal";
import TablePagination from "../../TablePagination";
import { getAllMaterials } from "@/lib/network/material";
import { useQuery } from "@tanstack/react-query";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MaterialVariantTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
}

export default function MaterialVariantTable<TData, TValue>({
  columns,
  data,
}: MaterialVariantTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { data: materials } = useQuery({
    queryFn: getAllMaterials,
    queryKey: ["materials"],
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="box-shadow w-full rounded-md bg-white">
      <div className="p-4 lg:p-6">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <h2 className="text-lg">Material Variant List</h2>
        </div>
      </div>
      <hr />
      <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 lg:p-6">
        <Select
          onValueChange={(value) => {
            if (value === "clear") {
              table.getColumn("material")?.setFilterValue("");
            } else {
              table.getColumn("material")?.setFilterValue(value);
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Main Material" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                value="clear"
                className="mt-1.5 text-base text-slate-600"
              >
                All Material
              </SelectItem>
              {materials?.map((item) => (
                <SelectItem
                  key={item.id}
                  value={item.name}
                  className="mt-1.5 text-base text-slate-600"
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="relative">
          <Search
            size={18}
            className="text-text-400 absolute left-3 top-1/2 -translate-y-1/2"
          />
          <Input
            placeholder="Search Variant"
            className="pl-9"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
          />
        </div>
        <CreateMaterialVariantModal>
          <div className="flex h-full w-full items-center justify-center gap-2 rounded-lg bg-primary text-background">
            <CirclePlus size={20} strokeWidth={2.25} />
            Create Variant
          </div>
        </CreateMaterialVariantModal>
      </div>
      <hr />
      <ScrollArea className="lg:max-w-[76vw]">
        <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <hr />
      <TablePagination table={table} />
    </div>
  );
}

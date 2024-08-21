"use client";

import { useEffect, useState } from "react";
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
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DateRange } from "react-day-picker";
import TablePagination from "../TablePagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";

interface ProjectTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
  title?: string;
}

export default function ProjectTable<TData, TValue>({
  columns,
  data,
  title,
}: ProjectTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data: userData } = useSession();
  const isUser = userData?.user.role === "user";

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
          <h2 className="text-lg">{title ? title : "Project List"}</h2>
        </div>
      </div>
      <hr />
      <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 lg:p-6">
        <div className="relative">
          <Search
            size={18}
            className="text-text-400 absolute left-3 top-1/2 -translate-y-1/2"
          />
          <Input
            placeholder="Search Username"
            className="pl-9"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
          />
        </div>
        {!isUser && (
          <Select
            onValueChange={(value) => {
              if (value === "clear") {
                table.getColumn("type")?.setFilterValue("");
              } else {
                table.getColumn("type")?.setFilterValue(value);
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Project Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  value="clear"
                  className="mt-1.5 text-base text-slate-600"
                >
                  All Type
                </SelectItem>

                <SelectItem
                  value={"assement"}
                  className="mt-1.5 text-base text-slate-600"
                >
                  Asset Management
                </SelectItem>
                <SelectItem
                  value={"build-electrical-installation"}
                  className="mt-1.5 text-base text-slate-600"
                >
                  Build Electrical Installation
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        <Select
          onValueChange={(value) => {
            if (value === "clear") {
              table.getColumn("status")?.setFilterValue("");
            } else {
              table.getColumn("status")?.setFilterValue(value);
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Project Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                value="clear"
                className="mt-1.5 text-base text-slate-600"
              >
                All Status
              </SelectItem>

              <SelectItem
                value={"planning"}
                className="mt-1.5 text-base text-slate-600"
              >
                Planning
              </SelectItem>
              <SelectItem
                value={"estimation"}
                className="mt-1.5 text-base text-slate-600"
              >
                Estimation
              </SelectItem>
              <SelectItem
                value={"offer"}
                className="mt-1.5 text-base text-slate-600"
              >
                Offer
              </SelectItem>
              <SelectItem
                value={"negotiation"}
                className="mt-1.5 text-base text-slate-600"
              >
                Negotiation
              </SelectItem>
              <SelectItem
                value={"contract"}
                className="mt-1.5 text-base text-slate-600"
              >
                Contract
              </SelectItem>
              <SelectItem
                value={"finished"}
                className="mt-1.5 text-base text-slate-600"
              >
                Finished
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <hr />
      <ScrollArea className="lg:max-w-[75vw]">
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

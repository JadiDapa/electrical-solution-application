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
import { CirclePlus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import TablePagination from "./TablePagination";
import CreateUserModal from "./Users/CreateUserModal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
}

export default function UserTable<TData, TValue>({
  columns,
  data,
}: UserTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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
          <h2 className="text-lg">User Accout List</h2>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:p-6">
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
        <div className="relative">
          <Search
            size={18}
            className="text-text-400 absolute left-3 top-1/2 -translate-y-1/2"
          />
          <Input
            placeholder="Search Email"
            className="pl-9"
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
          />
        </div>
        <Select
          onValueChange={(value) => {
            if (value === "clear") {
              table.getColumn("role")?.setFilterValue("");
            } else {
              table.getColumn("role")?.setFilterValue(value);
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                value="clear"
                className="mt-1.5 text-base text-slate-600"
              >
                All Role
              </SelectItem>
              <SelectItem
                value="user"
                className="mt-1.5 text-base text-slate-600"
              >
                User
              </SelectItem>
              <SelectItem
                value="unit"
                className="mt-1.5 text-base text-slate-600"
              >
                Unit
              </SelectItem>
              <SelectItem
                value="admin"
                className="mt-1.5 text-base text-slate-600"
              >
                Admin
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <CreateUserModal>
          <div className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-primary text-white hover:opacity-80">
            <CirclePlus size={20} strokeWidth={2.25} />
            Create User
          </div>
        </CreateUserModal>
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

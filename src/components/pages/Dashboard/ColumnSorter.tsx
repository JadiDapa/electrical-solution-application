import { ArrowUpDown } from "lucide-react";
import { Column } from "@tanstack/react-table";

type ColumnSorterProps = {
  column: Column<any, unknown>;
  header: string;
};

export default function ColumnSorter({ column, header }: ColumnSorterProps) {
  function handleClick() {
    column.toggleSorting(column.getIsSorted() === "asc");
  }

  return (
    <div
      onClick={handleClick}
      className="group flex w-full items-center gap-3 hover:bg-transparent"
    >
      {header}
      <ArrowUpDown className="ml-6 h-4 w-4 opacity-0 duration-150 group-hover:opacity-100" />
    </div>
  );
}

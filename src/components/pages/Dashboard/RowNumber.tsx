import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/components/ui/table";
import { useSearchParams } from "next/navigation";

interface TableNumberProps {
  rowIndex: number;
  pageSize?: number;
}

export default function TableNumber({
  rowIndex,
  pageSize = DEFAULT_PAGE_SIZE,
}: TableNumberProps) {
  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  const pageIndex = parseInt(page as string) || DEFAULT_PAGE_INDEX;
  const dataNumber = pageIndex * pageSize + rowIndex + 1;
  return <div className="ml-4 text-primary">{dataNumber}</div>;
}

// import { useMemo } from "react";
// import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/components/ui/table";

// export const cleanEmptyParams = <T extends Record<string, unknown>>(
//   search: T,
// ) => {
//   const newSearch = { ...search };
//   Object.keys(newSearch).forEach((key) => {
//     const value = newSearch[key];
//     if (
//       value === undefined ||
//       value === "" ||
//       (typeof value === "number" && isNaN(value))
//     )
//       delete newSearch[key];
//   });

//   if (search.pageIndex === DEFAULT_PAGE_INDEX) delete newSearch.pageIndex;
//   if (search.pageSize === DEFAULT_PAGE_SIZE) delete newSearch.pageSize;

//   return newSearch;
// };

// // Helper function to parse search params into an object
// function useSearchParamsObject() {
//   const { search } = useLocation();
//   return useMemo(() => {
//     const searchParams = new URLSearchParams(search);
//     const params: Record<string, string> = {};
//     searchParams.forEach((value, key) => {
//       params[key] = value;
//     });
//     return params;
//   }, [search]);
// }

// function objectToURLSearchParams(
//   obj: Record<string, string | undefined>,
// ): URLSearchParams {
//   const params = new URLSearchParams();
//   for (const [key, value] of Object.entries(obj)) {
//     if (value !== undefined) {
//       params.set(key, value);
//     }
//   }
//   return params;
// }

// export function useFilters() {
//   const navigate = useNavigate();
//   const filters = useSearchParamsObject();
//   console.log(filters);
//   const setFilters = (partialFilters: Partial<typeof filters>) => {
//     const newFilters = { ...filters, ...partialFilters };
//     navigate({
//       search: objectToURLSearchParams(cleanEmptyParams(newFilters)).toString(),
//     });
//   };

//   const resetFilters = () => {
//     navigate({
//       search: "",
//     });
//   };
//   return { filters, setFilters, resetFilters };
// }

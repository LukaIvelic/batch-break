import { Table } from "@tanstack/react-table";
import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const usePaginationUtils = <T>(table: Table<T>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const goToPage = (page: number) => {
    router.push(`${pathname}?${createQueryString("page", page.toString())}`);
  };

  const actions = {
    first: () => goToPage(1),
    prev: () => goToPage(table.getState().pagination.pageIndex),
    next: () => goToPage(table.getState().pagination.pageIndex + 2),
    last: () => goToPage(table.getPageCount()),
  };

  const disabled = {
    first: !table.getCanPreviousPage(),
    prev: !table.getCanPreviousPage(),
    next: !table.getCanNextPage(),
    last: !table.getCanNextPage(),
  };

  return { actions, disabled };
};

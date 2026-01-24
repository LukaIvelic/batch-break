import { create } from "zustand";

interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

interface TableStore {
  tables: Record<string, PaginationState>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPagination: (tableId: string, updater: any) => void;
}

export const usePaginationStore = create<TableStore>((set, get) => ({
  tables: {},
  setPagination: (tableId, updater) => {
    const current = get().tables[tableId] ?? { pageIndex: 0, pageSize: 30 };
    const nextState =
      typeof updater === "function" ? updater(current) : updater;

    set((state) => ({
      tables: {
        ...state.tables,
        [tableId]: nextState,
      },
    }));
  },
}));

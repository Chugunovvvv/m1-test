import { useMemo, useState } from "react";
import { ITypeItem } from "../types";

type SortDirection = "ASC" | "DESC";

function useSort(items: ITypeItem[]): [ITypeItem[], SortDirection, () => void] {
  const [sortBy, setSortBy] = useState<SortDirection>("ASC");
  const sortedItems = useMemo(() => {
    const itemsCopy = [...items];
    return sortBy === "ASC"
      ? itemsCopy.sort((a, b) => a.id - b.id)
      : itemsCopy.sort((a, b) => b.id - a.id);
  }, [items, sortBy]);

  const handleSortClick = () => {
    setSortBy((prev) => (prev === "ASC" ? "DESC" : "ASC"));
  };

  return [sortedItems, sortBy, handleSortClick];
}

export default useSort;

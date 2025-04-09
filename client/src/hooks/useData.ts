import { useEffect, useState } from "react";
import { ITypeItem } from "../types";

function useData() {
  const [items, setItems] = useState<ITypeItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${process.env.API_URL}/items`);
        const data: ITypeItem[] = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch items", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();

    const interval = setInterval(fetchItems, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { items, isLoading };
}

export default useData;

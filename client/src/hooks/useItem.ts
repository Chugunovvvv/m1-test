import { useEffect, useState } from "react";
import { ITypeItem } from "../types";

export const useItem = (id?: number) => {
  const [item, setItem] = useState<ITypeItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [accessDenied, setAccessDenied] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      try {
        const res = await fetch(`${process.env.API_URL}/items/${id}`);
        if (res.status === 403) {
          setAccessDenied(true);
          return;
        }
        if (!res.ok) {
          throw new Error("Fetch Failed");
        }
        const data: ITypeItem = await res.json();
        setItem(data);
      } catch (err) {
        console.error("Failed to fetch item", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  return { item, loading, accessDenied };
};

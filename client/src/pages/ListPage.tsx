import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { ListItem } from "./components";
import useData from "./useData";
import useSort from "./useSort";
import Button from "./components/Button";

const SubTitle: React.FC<PropsWithChildren> = ({ children }) => (
  <h2 className={"list-subtitle"}>Active Item ID: {children}</h2>
);

const ListPage = () => {
  const items = useData();
  const [sortedItems, sortBy, handleSortClick] = useSort(items);

  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");

  const handleItemClick = (id: number) => {
    setActiveItemId(id);
  };
  const activeItemText = useMemo(
    () => (activeItemId ? activeItemId.toString() : "Empty"),
    [activeItemId]
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    setFilteredItems(sortedItems);
  }, [sortedItems]);

  useEffect(() => {
    if (query.length > 0) {
      setFilteredItems(
        filteredItems.filter((item) =>
          `${item.id}`.includes(
            query
              .toLowerCase()
              .trimStart()
              .trimEnd()
              .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
          )
        )
      );
    }
  }, [query, filteredItems]);

  return (
    <div className={"list-wrapper"}>
      <div className="list-header">
        <h1 className={"list-title"}>Items List</h1>
        <SubTitle>{activeItemText}</SubTitle>
        <Button onClick={handleSortClick}>
          Sort ({sortBy === "ASC" ? "ASC" : "DESC"})
        </Button>
        <input
          type="text"
          placeholder={"Filter by ID"}
          value={query}
          onChange={handleQueryChange}
        />
      </div>
      <div className="list-container">
        <div className="list">
          {filteredItems.length === 0 && <span>items not found</span>}
          {filteredItems.map((item) => (
            <ListItem
              key={item.id}
              isActive={activeItemId === item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              onClick={() => handleItemClick(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListPage;

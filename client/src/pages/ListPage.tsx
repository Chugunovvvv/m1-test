import React, { useEffect, useMemo, useState } from "react";

import useData from "../hooks/useData";
import useSort from "../hooks/useSort";
import Button from "../components/Ui/Button";
import ListItem from "../components/ListItem";
import SubTitle from "../components/SubTitle";

const ListPage: React.FC = () => {
  const { items, isLoading } = useData();
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

  if (isLoading) return <div>Loading..</div>;

  return (
    <div className={"list-wrapper"}>
      <div className="list-header">
        <h1 className={"list-title"}>Items List</h1>
        <SubTitle>{`Active Item ID: ${activeItemText}`}</SubTitle>
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

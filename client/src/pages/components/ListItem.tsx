import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const ListItem: React.FC<any> = ({
  id,
  name,
  description,
  onClick,
  isActive,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick(id);
  };
  return (
    <li className={isActive ? "list-item active" : "list-item"}>
      <Link to={`/${id}`}>
        <div className={"list-item-actions"}>
          <div>
            ID: <b>{id}</b>
          </div>
          <Button onClick={handleClick} id={id} disabled={isActive}>
            {isActive ? "Active" : "Set Active"}
          </Button>
        </div>
        <div>{name}</div>
        <div className={"list-item__description"}>{description}</div>
      </Link>
    </li>
  );
};

export default ListItem;

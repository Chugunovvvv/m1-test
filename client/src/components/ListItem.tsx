import React from "react";
import { Link } from "react-router-dom";
import Button from "./Ui/Button";
import { ITypeItem } from "../types";

interface Props extends ITypeItem {
  onClick: (id: number) => void;
  isActive: boolean;
}

const ListItem: React.FC<Props> = ({
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
          <Button onClick={handleClick} customId={id} disabled={isActive}>
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

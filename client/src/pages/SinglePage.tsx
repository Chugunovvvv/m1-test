import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ITypeItem } from "../types";
import { useItem } from "../hooks/useItem";
import LinkBack from "../components/LinkBack";

const SinglePage: React.FC = () => {
  const { id } = useParams();
  const numericId = id ? Number(id) : undefined;
  const { item, loading, accessDenied } = useItem(numericId);
  if (loading) return <div>loading..</div>;
  if (accessDenied) {
    return (
      <div className="detail">
        <LinkBack />
        <h2>Access Denied</h2>
        <p>You don't have permission to view this item.</p>
      </div>
    );
  }

  if (!item) return <div>Item not found</div>;
  return (
    <div className="detail">
      <LinkBack />
      <h2>Item Details</h2>
      <p>ID: {item.id}</p>
      <p>Name: {item.name}</p>
      <p>Description: {item.description}</p>
    </div>
  );
};

export default SinglePage;

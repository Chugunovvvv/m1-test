import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ITypeItem } from "../types";

const SinglePage: React.FC = () => {
  const { id } = useParams();
  const [item, setItem] = useState<ITypeItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.API_URL}/items/${id}`)
      .then((res) => res.json())
      .then((data: ITypeItem) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch item", err);
      });
  }, [id]);

  if (!item) return <div>Item not found</div>;
  if (loading) return <div>loading..</div>;
  return (
    <div className="detail">
      <Link to={"/"}>Go Back</Link>
      <h2>Item Details</h2>
      <p>ID: {item.id}</p>
      <p>Name: {item.name}</p>
      <p>Description: {item.description}</p>
    </div>
  );
};

export default SinglePage;

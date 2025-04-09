import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type ItemType = {
  id: number;
  name: string;
  description: string;
};

function SinglePage() {
  const { id } = useParams();
  const [item, setItem] = useState<ItemType | null>(null);

  useEffect(() => {
    fetch(`${process.env.API_URL}/items/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data))
      .catch((err) => {
        console.error("Failed to fetch item", err);
      });
  }, []);
  if (!item) return <div>Item not found</div>;

  return (
    <div className="detail">
      <Link to={"/"}>Go Back</Link>
      <h2>Item Details</h2>
      <p>ID: {item.id}</p>
      <p>Name: {item.name}</p>
      <p>Description: {item.description}</p>
    </div>
  );
}

export default SinglePage;

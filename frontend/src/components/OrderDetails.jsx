import React, { useEffect, useState } from "react";
import { getOrderById } from "../api/api.js";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await getOrderById(id);
      setOrder(res.data);
    };
    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h2>Order Details (ID: {order.id})</h2>
      <p>User: {order.user?.name} ({order.user?.email})</p>
      <p>Total Price: {order.totalPrice}</p>
      <p>Status: {order.status}</p>
      <h3>Products</h3>
      <ul>
        {order.products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;

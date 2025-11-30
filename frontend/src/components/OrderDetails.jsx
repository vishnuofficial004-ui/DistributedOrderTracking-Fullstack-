import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { getOrderById } from "../api/api.js";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const OrderDetails = () => {
  const { id } = useParams();
  const { loading } = useContext(AppContext);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await getOrderById(id);
      setOrder(res.data);
    };
    fetchOrder();
  }, [id]);

  if (loading || !order) return <CircularProgress />;

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

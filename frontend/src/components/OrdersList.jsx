import React, { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const OrdersList = () => {
  const { orders, loading } = useContext(AppContext);

  if (loading) return <CircularProgress />;

  return (
    <div>
      <h2>All Orders</h2>
      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            Order ID: {o.id}, User: {o.user?.name}, Total: {o.totalPrice}, Status: {o.status}{" "}
            <Link to={`/orders/${o.id}`}>View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersList;


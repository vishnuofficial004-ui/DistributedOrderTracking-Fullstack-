import React, { useEffect, useState } from "react";
import { getOrders } from "../api/api.js";
import { Link } from "react-router-dom";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getOrders();
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

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

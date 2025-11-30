import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { createOrder } from "../api/api.js";
import { CircularProgress, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const OrderForm = () => {
  const { users, products, fetchAllData, loading } = useContext(AppContext);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser || selectedProducts.length === 0) {
      setMessage("Please select a user and at least one product");
      return;
    }
    try {
      await createOrder({
        userId: selectedUser,
        productIds: selectedProducts.map(Number),
      });
      setMessage("Order created successfully!");
      setSelectedUser("");
      setSelectedProducts([]);
      fetchAllData(); // Refresh global state
    } catch (err) {
      setMessage(err.response?.data?.error || "Error creating order");
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <div>
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
        <FormControl fullWidth>
          <InputLabel>User</InputLabel>
          <Select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
            {users.map((u) => (
              <MenuItem key={u.id} value={u.id}>{u.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Products</InputLabel>
          <Select
            multiple
            value={selectedProducts}
            onChange={(e) => setSelectedProducts([...e.target.selectedOptions].map((o) => o.value))}
          >
            {products.map((p) => (
              <MenuItem key={p.id} value={p.id}>{p.name} - {p.price}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" type="submit">Create Order</Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OrderForm;

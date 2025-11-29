import React, { useEffect, useState } from "react";
import { createOrder, getUsers, getProducts } from "../api/api.js";

const OrderForm = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch users and products on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await getUsers();
        const productsRes = await getProducts();
        setUsers(usersRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        console.error("Error fetching users/products", err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser || selectedProducts.length === 0) {
      setMessage("Please select a user and at least one product");
      return;
    }
    try {
      const res = await createOrder({
        userId: selectedUser,
        productIds: selectedProducts.map(Number),
      });
      setMessage(`Order created successfully! ID: ${res.data.id}`);
      setSelectedUser("");
      setSelectedProducts([]);
    } catch (err) {
      setMessage(err.response?.data?.error || "Error creating order");
    }
  };

  return (
    <div>
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User: </label>
          <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Products: </label>
          <select
            multiple
            value={selectedProducts}
            onChange={(e) =>
              setSelectedProducts([...e.target.selectedOptions].map((o) => o.value))
            }
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} - {p.price}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Create Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OrderForm;

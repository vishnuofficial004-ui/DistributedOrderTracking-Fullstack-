import React, { createContext, useState, useEffect } from "react";
import { getOrders, getUsers, getProducts } from "../api/api.js";

// Create context
export const AppContext = createContext();

// Context provider
export const AppProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all data from backend
  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch orders, users, and products in parallel
      const [ordersRes, usersRes, productsRes] = await Promise.all([
        getOrders(),
        getUsers(),
        getProducts(),
      ]);

      // Safely assign data (avoid undefined)
      setOrders(ordersRes?.data || []);
      setUsers(usersRes?.data || []);
      setProducts(productsRes?.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data from server.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        orders,
        setOrders,
        users,
        products,
        loading,
        error,
        fetchAllData, // expose this to refresh data
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


import axios from "axios";

const API_URL = "http://localhost:8080"; // Backend URL

// Orders
export const createOrder = (data) => axios.post(`${API_URL}/orders`, data);
export const getOrders = () => axios.get(`${API_URL}/orders`);
export const getOrderById = (id) => axios.get(`${API_URL}/orders/${id}`);
export const updateOrderStatus = (id, status) =>
  axios.put(`${API_URL}/orders/${id}/status`, { status });

// Users & Products
export const getUsers = () => axios.get(`${API_URL}/users`);
export const getProducts = () => axios.get(`${API_URL}/products`);

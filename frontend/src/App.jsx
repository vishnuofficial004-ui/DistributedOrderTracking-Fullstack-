import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import OrderForm from "./components/OrderForm.jsx";
import OrdersList from "./components/OrdersList.jsx";
import OrderDetails from "./components/OrderDetails.jsx";

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Orders</Link> | <Link to="/create">Create Order</Link>
      </nav>
      <Routes>
        <Route path="/" element={<OrdersList />} />
        <Route path="/create" element={<OrderForm />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

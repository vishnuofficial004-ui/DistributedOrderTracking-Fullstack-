package com.example.DistributedOrderTracking.service;

import com.example.DistributedOrderTracking.model.Order;
import com.example.DistributedOrderTracking.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // Create order (transactional)
    @Transactional
    public Order createOrder(Order order) {
        // You can add additional business logic here
        return orderRepository.save(order);
    }

    // Get all orders with pagination & sorting
    public List<Order> getAllOrders(int page, int size, String sortBy) {
        return orderRepository.findAll(
                PageRequest.of(page, size, Sort.by(sortBy))
        ).getContent();
    }

    // Get order by ID
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    // Update order
    public Order updateOrder(Order order) {
        return orderRepository.save(order);
    }

    // Delete order
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}

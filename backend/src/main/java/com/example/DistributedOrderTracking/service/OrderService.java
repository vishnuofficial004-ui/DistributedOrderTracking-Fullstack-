package com.example.DistributedOrderTracking.service;

import com.example.DistributedOrderTracking.dto.OrderRequest;
import com.example.DistributedOrderTracking.exception.ResourceNotFoundException;
import com.example.DistributedOrderTracking.model.*;
import com.example.DistributedOrderTracking.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired private OrderRepository orderRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private ProductRepository productRepo;
    @Autowired private OrderStatusRepository orderStatusRepo;

    @Transactional
    public Order createOrder(OrderRequest request) {
        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + request.getUserId()));

        List<Product> products = productRepo.findAllById(request.getProductIds());
        if (products.isEmpty()) {
            throw new ResourceNotFoundException("No products found for given ids");
        }

        double total = products.stream().mapToDouble(p -> p.getPrice() != null ? p.getPrice() : 0.0).sum();

        Order order = new Order();
        order.setUser(user);
        order.setProducts(products);
        order.setTotalPrice(total);
        order.setOrderDate(LocalDateTime.now());

        OrderStatus status = new OrderStatus();
        status.setStatus("CREATED");
        status.setUpdatedAt(LocalDateTime.now());
        status.setOrder(order);

        order.setOrderStatus(status);

        // Save order (orderStatus cascades)
        Order saved = orderRepo.save(order);

        return saved;
    }

    @Transactional(readOnly = true)
    public List<Order> getAllOrders() {
        return orderRepo.findAllByOrderByOrderDateDesc();
    }

    @Transactional(readOnly = true)
    public Order getOrderById(Long id) {
        return orderRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
    }

    @Transactional
    public Order updateOrderStatus(Long orderId, String newStatus) {
        Order order = getOrderById(orderId);
        OrderStatus os = order.getOrderStatus();
        if (os == null) {
            os = new OrderStatus();
            os.setOrder(order);
        }
        os.setStatus(newStatus);
        os.setUpdatedAt(LocalDateTime.now());
        order.setOrderStatus(os);
        orderStatusRepo.save(os);
        // order already managed — return it
        return order;
    }
}

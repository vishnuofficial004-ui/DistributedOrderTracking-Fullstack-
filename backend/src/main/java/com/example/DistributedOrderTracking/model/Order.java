package com.example.DistributedOrderTracking.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Double totalPrice;
    private LocalDateTime orderDate;

    @ManyToMany
    @JoinTable(
        name = "order_products",
        joinColumns = @JoinColumn(name = "order_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    private OrderStatus orderStatus;

    public Order() {}

    public Order(Long id, User user, Double totalPrice, LocalDateTime orderDate,
                 List<Product> products, OrderStatus orderStatus) {
        this.id = id;
        this.user = user;
        this.totalPrice = totalPrice;
        this.orderDate = orderDate;
        this.products = products;
        this.orderStatus = orderStatus;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }

    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }

    public List<Product> getProducts() { return products; }
    public void setProducts(List<Product> products) { this.products = products; }

    public OrderStatus getOrderStatus() { return orderStatus; }
    public void setOrderStatus(OrderStatus orderStatus) { this.orderStatus = orderStatus; }

    // Helper methods to match controller usage
    public String getStatus() {
        return orderStatus != null ? orderStatus.getStatus() : null;
    }

    public void setStatus(OrderStatus status) {
        if (this.orderStatus == null) {
            this.orderStatus = status;
            status.setOrder(this); // maintain bidirectional link
        } else {
            this.orderStatus.setStatus(status.getStatus());
        }
    }
}

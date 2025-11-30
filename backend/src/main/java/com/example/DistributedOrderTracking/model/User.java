package com.example.DistributedOrderTracking.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    private String role;  // <-- Added role field

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders;

    public User() {}

    public User(Long id, String name, String email, String role, List<Order> orders) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.orders = orders;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }     // <-- Getter
    public void setRole(String role) { this.role = role; }  // <-- Setter

    public List<Order> getOrders() { return orders; }
    public void setOrders(List<Order> orders) { this.orders = orders; }
}

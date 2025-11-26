package com.example.DistributedOrderTracking.Repository;

import com.example.DistributedOrderTracking.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findAllByOrderByOrderDateDesc(); 

    List<Order> findByUserId(Long userId);
}

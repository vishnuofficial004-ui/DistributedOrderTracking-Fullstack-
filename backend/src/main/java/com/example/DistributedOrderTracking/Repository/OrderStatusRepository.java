package com.example.DistributedOrderTracking.Repository;

import com.example.DistributedOrderTracking.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderStatusRepository extends JpaRepository<OrderStatus, Long> {
    OrderStatus findByOrderId(Long orderId);
}

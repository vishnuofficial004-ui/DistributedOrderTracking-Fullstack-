package com.example.DistributedOrderTracking.Repository;

import com.example.DistributedOrderTracking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by email
    User findByEmail(String email);

    // Check if email exists
    boolean existsByEmail(String email);
}


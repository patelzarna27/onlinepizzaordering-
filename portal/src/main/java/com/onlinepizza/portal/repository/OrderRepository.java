package com.onlinepizza.portal.repository;

import com.onlinepizza.portal.Model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {}

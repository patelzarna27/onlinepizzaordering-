package com.onlinepizza.portal.repository;


import com.onlinepizza.portal.Model.cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface cartRepository extends JpaRepository<cart, Long> {

}

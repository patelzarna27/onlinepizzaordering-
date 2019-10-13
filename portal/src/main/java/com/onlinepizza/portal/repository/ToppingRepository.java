package com.onlinepizza.portal.repository;

import com.onlinepizza.portal.Model.Topping;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToppingRepository extends JpaRepository<Topping, Long> {}

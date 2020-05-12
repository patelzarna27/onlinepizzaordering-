package com.onlinepizza.portal.repository;

import com.onlinepizza.portal.Model.Pizza;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PizzaRepository extends JpaRepository<Pizza, Long> {

      @Query(value = "SELECT * FROM pizza.pizza where is_delete = 0", nativeQuery = true)
      List<Pizza> findActivePizza();

      @Query(value = "SELECT distinct pizza_size FROM pizza.pizza where is_delete = 0", nativeQuery = true)
      List<String> getSize();

}


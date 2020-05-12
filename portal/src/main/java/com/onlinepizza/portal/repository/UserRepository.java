package com.onlinepizza.portal.repository;

import com.onlinepizza.portal.Model.Pizza;
import com.onlinepizza.portal.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT * FROM topping where is_delete = 0", nativeQuery = true)
    List<Pizza> findActivePizza();

}

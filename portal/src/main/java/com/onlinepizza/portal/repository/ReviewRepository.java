package com.onlinepizza.portal.repository;

import com.onlinepizza.portal.Model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {}

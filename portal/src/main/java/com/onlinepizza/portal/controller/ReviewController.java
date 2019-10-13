package com.onlinepizza.portal.controller;

import com.onlinepizza.portal.Model.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ReviewController {
    @Autowired
    private com.onlinepizza.portal.repository.ReviewRepository ReviewRepository;

    @GetMapping("/review")
    public List<Review> getAllReview() {
        return ReviewRepository.findAll();
    }
}

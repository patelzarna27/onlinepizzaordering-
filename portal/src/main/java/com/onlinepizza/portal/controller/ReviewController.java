package com.onlinepizza.portal.controller;

import com.onlinepizza.portal.Model.Review;
import com.onlinepizza.portal.exception.Helper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class ReviewController {
    @Autowired
    private com.onlinepizza.portal.repository.ReviewRepository ReviewRepository;

    @GetMapping("/review")
    public List<Review> getAllReview() {
        return ReviewRepository.findAll();
    }

    @GetMapping("/review/{userId}")
    public List<Review> getReviewByUsr(@PathVariable(value = "userId") String userId)
    {
        List<Review> rvw = new ArrayList<>();
        for(Review rv : ReviewRepository.findAll()){
            if(rv.getUser_Id().equalsIgnoreCase(userId)){
                rvw.add(rv);
            }
        }
        return rvw;
    }

    @PostMapping("/review/save")
    public int saveReview(@Valid @RequestBody Review review){
        try{
            review.setReview_Id(Helper.generateId());
            ReviewRepository.save(review);
            return 0;
        } catch (Exception ex){
            return  1;
        }
    }
}

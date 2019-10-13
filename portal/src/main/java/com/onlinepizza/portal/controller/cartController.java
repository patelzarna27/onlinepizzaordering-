package com.onlinepizza.portal.controller;


import com.onlinepizza.portal.Model.cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class cartController {
    @Autowired
    private com.onlinepizza.portal.repository.cartRepository cartRepository;
    @GetMapping("/cart")
    public List<cart> getAllCart() { return cartRepository.findAll();
    }

}

package com.onlinepizza.portal.controller;

import com.onlinepizza.portal.Model.Order;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.awt.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class OrderController {
    @Autowired
    private com.onlinepizza.portal.repository.OrderRepository OrderRepository;

    @GetMapping("/orders")
    public List<Order> getAllOrder() {
        return OrderRepository.findAll();
    }
}

package com.onlinepizza.portal.controller;


import com.onlinepizza.portal.Model.cart;

import javassist.expr.NewArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class cartController {
    @Autowired
    private com.onlinepizza.portal.repository.cartRepository cartRepository;

    @GetMapping("/cart")
    public List<cart> getAllCart() { return cartRepository.findAll(); }

    @GetMapping("/cart/{id}")
    public List<cart> getCartByOrder(@PathVariable("id") String orderId) {
        List<cart> crtList = new ArrayList<cart>();
        for (cart crt : cartRepository.findAll()) {
            if(crt.getOrder_Id().equalsIgnoreCase(orderId)){
                crtList.add(crt);
            }
        }
        return crtList;
    }

    @PostMapping("/cart/save")
    public int saveCart(@Valid @RequestBody cart cartData) {
        try {
            cartRepository.save(cartData);
            return 0;
        } catch (Exception ex) {
            return  -1;
        }
    }
}

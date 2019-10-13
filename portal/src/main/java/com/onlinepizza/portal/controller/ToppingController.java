package com.onlinepizza.portal.controller;


import com.onlinepizza.portal.Model.Topping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class ToppingController {
    @Autowired
    private com.onlinepizza.portal.repository.ToppingRepository ToppingRepository;
    @GetMapping("/topping")
    public List<Topping> getAllTopping() {
        return ToppingRepository.findAll();
    }

    @PostMapping("/topping/save")
    public Topping createTopping(@Valid @RequestBody Topping topping) {
        // user.setId(Helper.generateId(user.getUserId()));
        return ToppingRepository.save(topping);
    }


}

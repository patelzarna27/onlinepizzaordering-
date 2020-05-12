package com.onlinepizza.portal.controller;


import com.onlinepizza.portal.Model.Topping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
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

    @GetMapping("/topping/quantity/{toppingName}")
    public List<String> getQuantity(@PathVariable(value="toppingName") String toppingName){
        List<String> quantity = new ArrayList<String>();
        for(Topping myTopping: ToppingRepository.findAll()){
            if(myTopping.getTopping_Name().equalsIgnoreCase(toppingName)){
                if(quantity.contains(myTopping.getTopping_Quantity())!=true) {
                    quantity.add(myTopping.getTopping_Quantity());
                }
            }
        }
        return quantity;
    }

    @GetMapping("/topping/price/{name}&{quantity}")
    public String getToppingPrice(@PathVariable(value = "name") String toppingName, @PathVariable(value = "quantity") String topQnty){
      for(Topping myTopping : ToppingRepository.findAll()){
          if(myTopping.getTopping_Name().equalsIgnoreCase(toppingName) &&
                  myTopping.getTopping_Quantity().equalsIgnoreCase(topQnty)) {
              return myTopping.getTopping_Price();
          }
      }
      return "0";
    }


}

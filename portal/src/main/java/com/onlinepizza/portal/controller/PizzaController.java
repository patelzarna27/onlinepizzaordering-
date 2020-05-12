package com.onlinepizza.portal.controller;

import com.onlinepizza.portal.Model.Pizza;
import com.onlinepizza.portal.Model.User;
import com.onlinepizza.portal.repository.PizzaRepository;
import org.hibernate.engine.internal.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.ClientInfoStatus;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class PizzaController {
    @Autowired
    private PizzaRepository pizzaRepository;


    @GetMapping("/pizza")
    public List<Pizza> getAllpizza() {
        //return pizzaRepository.findActivePizza(false);
        return pizzaRepository.findActivePizza();
    }

    @GetMapping("pizza/size")
    public List<String> getPizzaSize() {
        return pizzaRepository.getSize();
    }

    @GetMapping("pizza/price/{size}&{type}")
    public String getPrice(@PathVariable(value = "size") String size, @PathVariable String type) {
        for(Pizza myPizza: pizzaRepository.findActivePizza()){
            if(myPizza.getPizza_Size().equalsIgnoreCase(size) && myPizza.getPizza_Type().equalsIgnoreCase(type)) {
                return myPizza.getPizza_Price();
            }
        }
        return "0";
    }

    @GetMapping("pizza/types/{size}")
    public List<String> getType(@PathVariable(value="size") String size){
       //return pizzaRepository.getPizzaTypes(size);
        List<String> pTypes = new ArrayList<String>();
        for (Pizza myPizza: pizzaRepository.findActivePizza()) {
            if(myPizza.getPizza_Size().equalsIgnoreCase(size)){
                if(pTypes.contains(myPizza.getPizza_Type())!= true){
                    pTypes.add(myPizza.getPizza_Type());
                }
            }
        }
        return pTypes;
    }

    @PostMapping("/pizza/save")
    public Pizza createPizza(@Valid @RequestBody Pizza pizza) {
        // user.setId(Helper.generateId(user.getUserId()));
        return pizzaRepository.save(pizza);
    }

    @PutMapping("/pizza/{id}")
    public boolean updateUser(@PathVariable(value = "id") Long pizzaId, @Valid @RequestBody Pizza pizzaDetails) {
        Optional<Pizza> pizza = pizzaRepository.findById(pizzaId);
        if(pizza.isPresent()){
            Pizza myPizza = pizza.get();
            myPizza.setPizza_Type(pizzaDetails.getPizza_Type());
            myPizza.setPizza_Size(pizzaDetails.getPizza_Size());
            myPizza.setPizza_Price(pizzaDetails.getPizza_Price());
            pizzaRepository.save(myPizza);
            return  true;
        }
        return  false;
    }

    @DeleteMapping("/pizza/{id}")
    public boolean deleteUser(@PathVariable(value = "id") long pizzaId) throws Exception {
        Optional<Pizza>  objPizza= pizzaRepository.findById(pizzaId);
        if(objPizza.isPresent()) {
            Pizza pizza = new Pizza();
           pizza = objPizza.get();
           pizza.setIs_delete(true);
           pizzaRepository.save(pizza);

            //pizzaRepository.delete(objPizza.get());
            return true;
        }
        return false;
    }


}

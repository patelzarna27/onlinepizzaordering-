package com.onlinepizza.portal.controller;

import com.onlinepizza.portal.Model.Order;
import com.onlinepizza.portal.Model.User;
import com.onlinepizza.portal.Model.cart;
import com.onlinepizza.portal.mail.EmailServiceImpl;
import com.onlinepizza.portal.repository.UserRepository;
import com.onlinepizza.portal.repository.cartRepository;
import io.micrometer.core.instrument.util.DoubleFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.onlinepizza.portal.repository.OrderRepository;

import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class OrderController {
    @Autowired
    private OrderRepository OrderRepository;

    @Autowired
    public EmailServiceImpl emailService;

    @Autowired
    private  cartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/orders")
    public List<Order> getAllOrder() {
        return OrderRepository.findAll();
    }

    @GetMapping("/orders/{userid}")
    public  List<Order> getAllUsrOrder(@PathVariable("userid") String userid){
        List<Order> retList = new ArrayList<Order>();
        try{
            for(Order odr:OrderRepository.findAll()){
                if(odr.getUser_id().equalsIgnoreCase(userid)){
                    retList.add(odr);
                }
            }
        } catch (Exception e){

        }
        return retList;
    }

    @PutMapping("/orders/{id}")
    public int updateOrder(@PathVariable(value = "id") String orderId,@Valid @RequestBody Order order)
    {
        int iRet=0;
        try {
            for (Order odr : OrderRepository.findAll()) {
                if (odr.getOrder_id().equalsIgnoreCase(orderId)) {
                    odr.setOrder_status(order.getOrder_status());
                    odr.setUpdatedAt(new Date());
                    OrderRepository.save(odr);
                    break;
                }
            }
        } catch (Exception ex){
            iRet = -1;
        }
        return iRet;
    }

    @GetMapping("/orders/getOrderNo")
    public String getOrderNo() {
        Random random = new Random();
        // generate a random integer from 0 to 899, then add 100
        int x = random.nextInt(900) + 100;
        return String.valueOf(x);
    }

    @PostMapping("/orders/save")
    public int saveOrder(@Valid @RequestBody Order order) {
        try {
            order.setOrder_status("Accepted");
            String message = prepareOrderEmail(order);
            OrderRepository.save(order);
           //"Thank you for placing order with us. Your order#"+order.getOrder_id();
            String subject = "Your pizza order#"+ order.getOrder_id();
            String toEmail = getUserEmail(order.getUser_id());
            emailService.sendSimpleMessage(toEmail,subject,message);
            return 0;
        }
        catch (Exception ex){
            return -1;
        }
    }

    @GetMapping("orders/send")
    public int sendemail()
    {

        emailService.sendSimpleMessage("patelzarna27@gmail.com","test","hi this is simple test");
        return 0;
    }

    public String getUserEmail(String userId){
        String bResult="";
        try {
            for (User myUser: userRepository.findAll()) {
                if(myUser.getUserId().equalsIgnoreCase(userId.trim())){
                    bResult = myUser.getEmail();
                    break;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return  bResult;
    }

    String prepareOrderEmail(Order order){

        //Order Details
        //Order #: 130
        //Date: 11/03/2019 8:10PM
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyyy hh:mm a");
        String odrStr = "";
        odrStr ="Thank you for placing order with us.\n\n";
        odrStr += "Order Detail \n" +
                 "Order #: "+ order.getOrder_id() + "\n" +
                 "Date: "+ new SimpleDateFormat("MM/dd/yyyyy hh:mm a").format( new Date()) + "\n\n";
        String tempCart =  "The following order is being prepared \n";
        double total = 0;
        for(cart cart : cartRepository.findAll()) {
            if (cart.getOrder_Id().equalsIgnoreCase(order.getOrder_id())) {
                tempCart += ("Item: " + cart.getItem() + "\n"+
                        "Quantity: " + cart.getItemQty() + "\n" +
                        "Amount: " + cart.getItemPrice() + "\n\n");
                total += Double.parseDouble(cart.getItemQty()) * Double.parseDouble(cart.getItemPrice());
            }

        }
        if(tempCart.length() > 30){
            odrStr+=tempCart;
        }

        double Tax = total * 0.0687;
        odrStr += "Food Total: "+ total + "\n";
        odrStr += "Tax: "+ String.format("%.2f",Tax) +"\n";
        odrStr += "Total: "+ String.format("%.2f",total+Tax) + "\n\n\n";

        odrStr += "Payment Detail \n";
        odrStr += "Transaction ID: "+ getOrderNo()+getOrderNo()+"\n";
        odrStr += "Card Number: XXXXXXXXXXX0"+ getOrderNo()+"\n";

        System.out.print(odrStr);


        return  odrStr;
    }
}

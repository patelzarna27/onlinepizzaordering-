package com.onlinepizza.portal.Model;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "cart")
@EntityListeners(AuditingEntityListener.class)
public class cart {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    public Date getCreatedAt() {
        return createdAt;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    @Column(name = "cart_id", nullable = false)
    private String cart_Id;
    @Column(name = "pizza_quantity" , nullable = false)
    private String pizza_Quantity;

    @Column(name = "user_id" , nullable = false)
    private String user_Id;

    @Column(name = "topping_id", nullable = false)
    private String topping_Id;

    @Column(name = "pizza_id", nullable = false)
    private String pizza_Id;

    public String getCart_Id() {
        return cart_Id;
    }

    public void setCart_Id(String cart_Id) {
        this.cart_Id = cart_Id;
    }

    public String getPizza_Quantity() {
        return pizza_Quantity;
    }

    public void setPizza_Quantity(String pizza_Quantity) {
        this.pizza_Quantity = pizza_Quantity;
    }

    public String getPizza_Id() {
        return pizza_Id;
    }

    public void setPizza_Id(String pizza_Id) {
        this.pizza_Id = pizza_Id;
    }

    public String getUser_Id() {
        return user_Id;
    }

    public void setUser_Id(String user_Id) {
        this.user_Id = user_Id;
    }

    public String getTopping_Id() {
        return topping_Id;
    }

    public void setTopping_Id(String topping_Id) {
        this.topping_Id = topping_Id;
    }
}

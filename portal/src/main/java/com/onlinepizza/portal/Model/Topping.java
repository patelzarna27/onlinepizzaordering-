package com.onlinepizza.portal.Model;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "topping")
@EntityListeners(AuditingEntityListener.class)


public class Topping {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @Column(name = "topping_name", nullable = false)
    private String topping_Name;

    @Column(name = "topping_quantity", nullable = false)
    private String topping_Quantity;

    @Column(name = "topping_price", nullable = false)
    private String topping_Price;

    @Column(name = "is_delete", nullable = false)
    private boolean is_delete;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTopping_Name() {
        return topping_Name;
    }

    public void setTopping_Name(String topping_Name) {
        this.topping_Name = topping_Name;
    }

    public String getTopping_Quantity() {
        return topping_Quantity;
    }

    public void setTopping_Quantity(String topping_Quantity) {
        this.topping_Quantity = topping_Quantity;
    }

    public String getTopping_Price() {
        return topping_Price;
    }

    public void setTopping_Price(String topping_Price) {
        this.topping_Price = topping_Price;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Boolean getIs_Delete() {return is_delete; }
    public void setIs_delete(Boolean is_delete) { this.is_delete = is_delete; }

}

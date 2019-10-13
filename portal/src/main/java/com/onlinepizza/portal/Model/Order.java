package com.onlinepizza.portal.Model;


import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "orders")
@EntityListeners(AuditingEntityListener.class)
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false)
    private Date createdAt;
    public Date getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    @Column(name = "order_id", nullable = false)
    private String order_Id;

    @Column(name = "total_amount", nullable = false)
    private String total_Amount;

    @Column(name = "created", nullable = false)
    private String Created;

    @Column(name = "user_id", nullable = false)
    private String user_Id;


    public String getOrder_Id() {
        return order_Id;
    }

    public void setOrder_Id(String order_Id) {
        this.order_Id = order_Id;
    }

    public String getTotal_Amount() {
        return total_Amount;
    }

    public void setTotal_Amount(String total_Amount) {
        this.total_Amount = total_Amount;
    }

    public String getCreated() {
        return Created;
    }

    public void setCreated(String created) {
        Created = created;
    }

    public String getUser_Id() {
        return user_Id;
    }

    public void setUser_Id(String user_Id) {
        this.user_Id = user_Id;
    }
}

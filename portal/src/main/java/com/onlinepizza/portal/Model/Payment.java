package com.onlinepizza.portal.Model;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "payment")
@EntityListeners(AuditingEntityListener.class)

public class Payment {


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

    @Column(name = "payment_id", nullable = false)
    private String payment_Id;
    @Column(name = "payment_type", nullable = false)
    private String payment_Type;

    @Column(name = "amount", nullable = false)
    private String Amount;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "paymentDateTime", nullable = false)
    private Date payment_datetime;

    @Column(name = "order_id", nullable = false)
    private String order_Id;

    @Column(name = "creditcard_no", nullable = false)
    private String creditcard_No;

    public String getPayment_Id() {
        return payment_Id;
    }

    public void setPayment_Id(String payment_Id) {
        this.payment_Id = payment_Id;
    }

    public String getPayment_Type() {
        return payment_Type;
    }

    public void setPayment_Type(String payment_Type) {
        this.payment_Type = payment_Type;
    }

    public String getAmount() {
        return Amount;
    }

    public void setAmount(String amount) {
        Amount = amount;

    }

    public Date getPayment_datetime() {
        return payment_datetime;
    }

    public void setPayment_datetime(Date payment_datetime) {
        this.payment_datetime = payment_datetime;
    }

    public String getOrder_Id() {
        return order_Id;
    }

    public void setOrder_Id(String order_Id) {
        this.order_Id = order_Id;

    }

    public String getCreditcard_No() {
        return creditcard_No;
    }

    public void setCreditcard_No(String creditcard_No) {
        this.creditcard_No = creditcard_No;
    }
}

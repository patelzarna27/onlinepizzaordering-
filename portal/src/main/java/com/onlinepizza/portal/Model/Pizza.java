

package com.onlinepizza.portal.Model;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "pizza")
@EntityListeners(AuditingEntityListener.class)
public class Pizza {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "pizza_type" , nullable = false)
    private String pizza_Type;

    @Column(name = "pizza_size", nullable = false)
    private String pizza_Size;

    @Column(name = "pizza_price", nullable = false)
    private String pizza_Price;
    @Column(name = "is_delete", nullable = false)
    private boolean is_delete;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    public String getPizza_Type() {
        return pizza_Type;
    }
    public void setPizza_Type(String pizza_Type) {
        this.pizza_Type = pizza_Type;
    }

    public String getPizza_Size() {
        return pizza_Size;
    }
    public void setPizza_Size(String pizza_Size) {
        this.pizza_Size = pizza_Size;
    }

    public String getPizza_Price() {
        return pizza_Price;
    }
    public void setPizza_Price(String pizza_Price) { this.pizza_Price = pizza_Price; }

    public Boolean getIs_Delete() {return is_delete; }
    public void setIs_delete(Boolean is_delete) { this.is_delete = is_delete; }

    public Date getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

}

package com.onlinepizza.portal.Model;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "creditcard")
@EntityListeners(AuditingEntityListener.class)

public class Creditcard {

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

    @Column(name = "creditcard_no", nullable = false)
    private String creditcard_No;
    @Column(name = "expire_date" , nullable = false)
    private String expire_Date;

    @Column(name = "security_code" , nullable = false)
    private String security_Code;

    @Column(name = "user_id", nullable = false)
    private String user_Id;

    public String getCreditcard_No() {
        return creditcard_No;
    }

    public void setCreditcard_No(String creditcard_No) {
        this.creditcard_No = creditcard_No;
    }

    public String getExpire_Date() {
        return expire_Date;
    }

    public void setExpire_Date(String expire_Date) {
        this.expire_Date = expire_Date;
    }

    public String getSecurity_Code() {
        return security_Code;
    }

    public void setSecurity_Code(String security_Code) {
        this.security_Code = security_Code;
    }

    public String getUser_Id() {
        return user_Id;
    }

    public void setUser_Id(String user_Id) {
        this.user_Id = user_Id;
    }

}

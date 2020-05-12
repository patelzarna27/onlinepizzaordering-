package com.onlinepizza.portal.Model;


import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "review")
@EntityListeners(AuditingEntityListener.class)
public class Review {

    @Id
    @Column(name = "review_id", nullable = false)
    private long review_Id;
    @Column(name = "comments", nullable = false)
    private String Comments;

    @Column(name = "order_id", nullable = false)
    private String order_Id;

    @Column(name = "user_id", nullable = false)
    private String user_Id;


    public long getReview_Id() {
        return review_Id;
    }

    public void setReview_Id(long review_Id) {
        this.review_Id = review_Id;
    }

    public String getComments() {
        return Comments;
    }

    public void setComments(String comments) {
        Comments = comments;
    }

    public String getOrder_Id() {
        return order_Id;
    }

    public void setOrder_Id(String order_Id) {
        this.order_Id = order_Id;
    }

    public String getUser_Id() {
        return user_Id;
    }

    public void setUser_Id(String user_Id) {
        this.user_Id = user_Id;
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


}

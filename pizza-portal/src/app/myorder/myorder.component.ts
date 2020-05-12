import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { HttpClientService } from '../service/http-client.service';
import {Cart} from '../service/cart';
import {Order} from '../service/order';
import {faEdit,faSave,faCommentDots} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Review} from '../service/review';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {
  faEdit = faEdit;
  faSave = faSave;
  faSmile = faCommentDots;
  private  orderCart:Cart[];
  private  orders:Order[];
  private  rvArray: Review[];

  feedback: string;
  SelOrd : Order = new Order();
  review: Review = new Review();

  constructor(private authSerice:AuthenticationService,
              private orderService:HttpClientService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.loadReviews();
    this.loadCarts();
    this.loadOrders();

  }

  open(content: any, odr:Order) {
    console.log(content);
    console.log(odr);
    this.SelOrd = odr;
    this.modalService.open(content);
  }

  loadCarts() {
    this.orderService.getOrderCart().subscribe(data=>{
      console.log(data);
      this.orderCart = data});
    console.log(this.orderCart);
  }

  loadOrders(){
    if(this.authSerice.isEmployeeLoggedIn()) {
      this.orderService.getAllOrder().subscribe(data => {
        console.log(data);
        this.orders = data;
      });
    } else {
      this.orderService.getUsrOrder(this.authSerice.getUserName())
        .subscribe(data=>{
          console.log(data);
          this.orders = data;
        });
    }
  }

  loadReviews(){
    if(this.authSerice.isEmployeeLoggedIn()){
      this.orderService.getAllfeedback().subscribe(data =>{
        this.rvArray = data;
      });
    } else {
      this.orderService.getUsrFeedback(this.authSerice.getUserName())
        .subscribe(data=>{
          this.rvArray = data;
        })
    }
  }

  getOrderCart(odr:Order) {
    let crtItem:string[] = [];
    this.orderCart.forEach(function(element) {
       if(element.order_Id === odr.order_id.toString()){
         crtItem.push(element.item.toString());
       }
    });
   return crtItem;
  }

  getOrderFeedback(odr:Order){
    let feedBcks:String[] = [];
    this.rvArray.forEach(function(element) {
      if(element.order_Id === odr.order_id.toString()){
        feedBcks.push(element.comments.toString());
      }
    });
    return feedBcks;
  }

  onSelect(obj: any, odr:Order){
    console.log(obj);
    odr.order_status=obj.toString();
  }

  saveOrderStatus(odr:Order){
    console.log(odr);
    this.orderService.updateOrderStatus(odr);
    odr.isEditable=false;
  }

  saveFeedback(){
    this.review.order_Id = this.SelOrd.order_id;
    this.review.user_Id = this.authSerice.getUserName();
    this.review.comments = this.feedback;
    this.orderService.saveFeedback(this.review);
    this.modalService.dismissAll();
    this.loadReviews();
    this.loadCarts();
    this.loadOrders();
  }
}



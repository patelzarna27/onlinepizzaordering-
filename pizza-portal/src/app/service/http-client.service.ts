import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './users';
import {Pizza} from './pizza';
import {Topping} from './topping';
import {Cart} from './cart';
import {Order} from './order';
import {Review} from './review';

export class Employee {
  constructor(
    public  empId: string,
    public  name: string,
    public  email: string,
    public  phone: string,
    public  password: string,
  ) {}

}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient) {
  }
  private carts: Cart[] = [];

  private  order = new Order();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getUserDetail(userId: string){
    return this.httpClient.get<User>('http://localhost:8080/api/v1/users/'+userId);
  }

  register(userData: User) {
    console.log('user saving');

    const requestData = JSON.stringify(userData);
    return this.httpClient.post('http://localhost:8080/api/v1/users/save', requestData, this.httpOptions);
  }

  registerEmployee(userData: User) {
    console.log('employee saving');

    const requestData = JSON.stringify(userData);
    return this.httpClient.post('http://localhost:8080/api/v1/users/employee/save', requestData, this.httpOptions);
  }

  updateUser(userData: User){

    const requestData = JSON.stringify(userData);
    console.log(requestData);
    return this.httpClient.post('http://localhost:8080/api/v1/users/update',requestData,this.httpOptions);
  }

  getPizza() {
    return this.httpClient.get<Pizza[]>('http://localhost:8080/api/v1/pizza');
  }

  savePizza(pizzaData: Pizza) {
    console.log('pizza saving');
    const requestData = JSON.stringify(pizzaData);
    console.log(requestData);
    return this.httpClient.post('http://localhost:8080/api/v1/pizza/save', requestData, this.httpOptions);
  }

  updatePizza(pizzaData: Pizza) {
    console.log('pizza updating');
    const requestData = JSON.stringify(pizzaData);
    return this.httpClient.put('http://localhost:8080/api/v1/pizza/' + pizzaData.id, requestData, this.httpOptions);
  }

  deletePizza(pizzaData: Pizza) {
    console.log('pizza deleting');
    return this.httpClient.delete('http://localhost:8080/api/v1/pizza/' + pizzaData.id, this.httpOptions);
  }

  getTopping() {
    return this.httpClient.get<Topping[]>('http://localhost:8080/api/v1/topping');
  }
  saveTopping(toppingData: Topping) {
    console.log('topping saving');
    const requestData = JSON.stringify(toppingData);
    console.log(requestData);
    return this.httpClient.post('http://localhost:8080/api/v1/topping/save', requestData, this.httpOptions);
  }

  updateTopping(toppingData: Topping) {
    const requestData = JSON.stringify(toppingData);
    return this.httpClient.put('http://localhost:8080/api/v1/topping/' + toppingData.id, requestData, this.httpOptions);
  }
  deleteTopping(toppingData: Topping) {
    return this.httpClient.delete('http://localhost:8080/api/v1/topping/' + toppingData.id, this.httpOptions);
  }

  getToppingQuantity(topping: string) {
    return this.httpClient.get('http://localhost:8080/api/v1/topping/quantity/' + topping);
  }

  getPizzaSize() {
    return this.httpClient.get('http://localhost:8080/api/v1/pizza/size');
  }

  getPizzaType(size: string) {
    return this.httpClient.get('http://localhost:8080/api/v1/pizza/types/' + size);
  }

  getPizzaPrice(size: string, type: string) {
    return this.httpClient.get('http://localhost:8080/api/v1/pizza/price/' + size + '&' + type);
  }

  getToppingPrice(topName: string, topQty: string) {
    return this.httpClient.get('http://localhost:8080/api/v1/topping/price/' + topName + '&' + topQty);
  }

  addToCart(cartdata: Cart) {
  //  console.log(cartdata);
    const index = this.carts.findIndex(p => p.item.toUpperCase() === cartdata.item.toUpperCase());
    if (index === -1) {
        this.carts.push(cartdata);
    } else {
       this.carts[index].itemQty = this.carts[index].itemQty + cartdata.itemQty;
       this.carts[index].itemPrice = this.carts[index].itemPrice + cartdata.itemPrice;
    }
  }

  deleteFromCart(cartData: Cart) {
    console.log(cartData);
    const filters = this.carts.filter(p => p.item.toUpperCase() !== cartData.item.toUpperCase());
    console.log(filters.length);
    this.carts = filters;
  }

  deleteCart() {
    this.carts = [];
  }


  getTotalCartItems()  {
    return this.carts.length;
  }

  getCart() {
    return this.carts;
  }

  getOrderCart(){
    return this.httpClient.get<Cart[]>('http://localhost:8080/api/v1/cart/');
  }

  saveCart() {
    this.carts.forEach(data => {
      data.order_Id = this.order.order_id;
      console.log(data);
      data.order_Id = this.order.order_id;
      this.httpClient.post<string>('http://localhost:8080/api/v1/cart/save', data , this.httpOptions)
        .subscribe(responseData => {
          console.log(responseData);
        });
    });
  }

  generateOrderNo() {
    this.httpClient.get<string>('http://localhost:8080/api/v1/orders/getOrderNo')
      .toPromise()
      .then(data => {
        console.log(data);
        this.order.order_id = data;
      });
  }

  saveOrder( totalPrice: string) {
    this.order.order_total = totalPrice.toString();
    console.log(this.order.order_total);
    this.order.user_id = sessionStorage.getItem('username');
    console.log(this.order);
    return this.httpClient.post('http://localhost:8080/api/v1/orders/save', this.order, this.httpOptions)
      .subscribe(data => {
        console.log( data)
      });
  }

  getOrder() {
    return this.order;
  }
  setOrderId(data: string) {
    this.order.order_id = data;
  }

  getAllOrder(){
    return this.httpClient.get<Order[]>('http://localhost:8080/api/v1/orders');
  }

  getUsrOrder(usrId:string){
    return this.httpClient.get<Order[]>('http://localhost:8080/api/v1/orders/'+usrId);
  }

  updateOrderStatus(odr:Order){
    this.httpClient.put('http://localhost:8080/api/v1/orders/'+odr.order_id,odr,this.httpOptions)
      .subscribe(data=>{
        return data;
      });
  }

  saveFeedback(review:Review){
    this.httpClient.post('http://localhost:8080/api/v1/review/save',review,this.httpOptions).subscribe(data =>{
      console.log(data);
      return data;
    });
  }

  getUsrFeedback(userId:string){
    return this.httpClient.get<Review[]>('http://localhost:8080/api/v1/review/'+userId);
  }

  getAllfeedback(){
    return this.httpClient.get<Review[]>('http://localhost:8080/api/v1/review');
  }

}


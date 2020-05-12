import { Component, OnInit } from '@angular/core';
import {Cart} from '../service/cart';
import {HttpClientService} from '../service/http-client.service';
import {Order} from '../service/order';

@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.css']
})
export class OrdersummaryComponent implements OnInit {

  private  carts: Cart[];
  private  order: Order;
  constructor(private cartService: HttpClientService) {
    this.carts = this.cartService.getCart();
    this.order = this.cartService.getOrder();
    this.cartService.deleteCart();
  }

  ngOnInit() {
  }

  getTotal(): any {
    let total = 0;
    this.carts.forEach((data) => {
      total = data.itemQty * data.itemPrice + total;
    });
    return total.toFixed(2);
  }
  getTax(): any {
    return (this.getTotal() * 0.06875).toFixed(2);
  }

  totalCost(): any {
    return ((parseFloat(this.getTotal()) * 0.06875) + parseFloat(this.getTotal())).toFixed(2);
  }

}

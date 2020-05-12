import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { Cart } from '../service/cart';
import { faTrashAlt,faDollarSign, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import {isNumber} from 'util';
import {Router} from '@angular/router';


@Component({
  selector: 'app-pizzacart',
  templateUrl: './pizzacart.component.html',
  styleUrls: ['./pizzacart.component.css']
})
export class PizzacartComponent implements OnInit {
  faTrash = faTrashAlt;
  faDollarSign = faDollarSign;
  faPlus = faPlus;
  faMinus = faMinus;
  private  carts: Cart[];
  constructor( private cartService: HttpClientService,
               private router: Router) {
  }

  ngOnInit() {
    this.carts = this.cartService.getCart();
    this.cartService.generateOrderNo();
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
  redQuntity(data: Cart) {
    if (data.itemQty > 1) {
      data.itemQty--;
    }
  }

  incQunatity(data: Cart) {
    if (data.itemQty < 12) {
      data.itemQty++;
    }
  }

  onCheckout() {
   this.cartService.deleteCart();
   this.carts.forEach((data) => {
     console.log(data);
     this.cartService.addToCart(data);
   });
   this.cartService.saveCart();
   this.router.navigate(['/checkout']);

  }

  onDelete(data: Cart) {
    this.cartService.deleteFromCart(data);
    this.carts = this.cartService.getCart();
  }

}

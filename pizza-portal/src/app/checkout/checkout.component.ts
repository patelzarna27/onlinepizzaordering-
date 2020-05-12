import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { Cart } from '../service/cart';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
 private  paymentform: FormGroup;
  private  carts: Cart[];
  private submitted = false;
  private  error = '';
  constructor( private cartService: HttpClientService,
               private formBuilder: FormBuilder,
               private  router: Router) { }

  ngOnInit() {
    this.carts = this.cartService.getCart();
    this.paymentform = this.formBuilder.group({
      cardholder: ['', Validators.required],
      cardnumber: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      expirationdate: ['', Validators.required],
      cvc: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.paymentform.controls; }

  onClick() {
    this.error = '';
    console.log('hello');
    this.submitted = true;

    if (this.paymentform.invalid) {
      return;
    }
    this.cartService.saveOrder(this.totalCost());
    this.router.navigate(['/ordersummary']);
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

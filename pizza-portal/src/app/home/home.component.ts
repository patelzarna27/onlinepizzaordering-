import { Component, OnInit } from '@angular/core';
import {HttpClientService} from '../service/http-client.service';
import {Topping} from '../service/topping';
import {Cart} from '../service/cart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pSize: object ;
  pType: object;
  pTopQunatity: object;
  pQuntity: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  sizeSelect: any = '';
  typeSelect: any = '';
  topSelect: any = '';
  quantitySelect: any = '';
  totalItems: any = 0;
  itemQnty: any = 1;

  private toppingData: Topping[];
  constructor(private pizzaService: HttpClientService) { }

  ngOnInit() {
    this.pizzaService.getPizzaSize()
      .subscribe(
        data => {
          this.pSize = data;
        }
      );
    this.pizzaService.getTopping()
      .subscribe(data => {
        this.toppingData = data;
      });
  }

  OnSizeSelect() {
    console.log(this.sizeSelect);
    this.pizzaService.getPizzaType(this.sizeSelect)
      .subscribe(data => {
          this.pType = data;
      });
  }

  OnToppingSelect() {
    console.log(this.topSelect);
    this.pizzaService.getToppingQuantity(this.topSelect)
      .subscribe(data => {
        this.pTopQunatity = data;
      });
  }

  OnAddToOrder() {
    this.totalItems++;
    let patrice = 0;
    let toprice = 0;
    this.pizzaService.getPizzaPrice(this.sizeSelect, this.typeSelect).toPromise()
       .then(data => {
           patrice = parseFloat(data.toString());
           console.log(patrice);

           this.pizzaService.getToppingPrice(this.topSelect, this.quantitySelect)
           .toPromise()
           // tslint:disable-next-line:no-shadowed-variable
           .then(data => {
             toprice = parseFloat(data.toString());
             console.log(toprice);
             const cartitem = {
               order_Id: '0',
               item: this.sizeSelect + ' ' + this.typeSelect + ' ' + this.topSelect,
               // tslint:disable-next-line:radix
               itemQty: parseInt(this.itemQnty),
               itemPrice:  toprice + patrice
             };

             this.pizzaService.addToCart(cartitem);
           });
      });
  }

}

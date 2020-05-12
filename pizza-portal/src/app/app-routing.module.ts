import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {PizzaComponent} from './pizza/pizza.component';
import {ToppingComponent} from './topping/topping.component';
import {EmpsignupComponent} from './empsignup/empsignup.component';
import {EmploginComponent} from './emplogin/emplogin.component';
import {PizzacartComponent} from './pizzacart/pizzacart.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {OrdersummaryComponent} from './ordersummary/ordersummary.component';
import {MyorderComponent} from './myorder/myorder.component';
import {ProfileComponent} from './profile/profile.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'pizza', component: PizzaComponent},
  {path: 'empsignup', component: EmpsignupComponent},
  {path: 'emplogin', component: EmploginComponent},
  {path: 'topping', component: ToppingComponent},
  {path: 'cart', component: PizzacartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'ordersummary', component: OrdersummaryComponent},
  {path: 'orders', component: MyorderComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

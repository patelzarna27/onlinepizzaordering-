import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeComponent} from './employee/employee.component'
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {PizzaComponent} from './pizza/pizza.component';
import {ToppingComponent} from './topping/topping.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'employees', component: EmployeeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'pizza', component: PizzaComponent},
  {path: 'topping', component: ToppingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

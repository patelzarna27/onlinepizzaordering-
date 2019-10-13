import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { PizzaComponent } from './pizza/pizza.component';
import { ToppingComponent } from './topping/topping.component';



@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    LoginComponent,
    LogoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    PizzaComponent,
    ToppingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

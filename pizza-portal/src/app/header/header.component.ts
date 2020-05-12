import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { faSignOutAlt, faPizzaSlice, faTasks, faKaaba , faHome, faUser, faCoins,faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {unwrapResolvedMetadata} from '@angular/compiler';
import {HttpClientService} from '../service/http-client.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;
  faPizzaSlice = faPizzaSlice;
  faTasks = faTasks;
  faKaaba = faKaaba;
  faHome = faHome;
  faUser = faUser;
  faCoins = faCoins;
  faShoppingCart = faShoppingCart;
    constructor(private loginService: AuthenticationService,
                private httpService: HttpClientService) { }
  ngOnInit() {
  }

}

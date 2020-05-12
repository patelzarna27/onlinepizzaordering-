import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authentocationService: AuthenticationService,
    private router: Router) {

  }

  ngOnInit() {
    const isemploggedin = this.authentocationService.isEmployeeLoggedIn();
    this.authentocationService.logOut();
    if(isemploggedin){
      this.router.navigate(['emplogin']);
    } else {
      this.router.navigate(['login']);
    }
  }

}

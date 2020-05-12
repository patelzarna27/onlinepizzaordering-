import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './users';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private myHttpClient: HttpClient) {  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  authenticate(loginData: User) {
    const  authResult = false;
    const requestData = JSON.stringify(loginData);
    return this.myHttpClient.post('http://localhost:8080/api/v1/users/validate', requestData, this.httpOptions);
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    // console.log(!(user === null));
    return (!(user === null));
  }

  isEmployeeLoggedIn() {
    const employee = sessionStorage.getItem('employee');
    if (employee !== null ) {
      if (employee === '1') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  getUserName()
  {
    return sessionStorage.getItem('username');
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('employee');
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import {Observable, Subscription} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

  invalidLogin = false;

  constructor(private router: Router,
              private loginservice: AuthenticationService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userId: ['', Validators.required],
      userPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onClick() {
    this.error = '';
    console.log('hello');
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.getRawValue());
    console.log(this.loginForm.get('userId').value);
    const responseData = this.loginservice.authenticate(this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if (data !== 0 ) {
           // sessionStorage.setItem('employee', data.toString());
            if (data !== 1) {
              sessionStorage.setItem('username', this.loginForm.get('userId').value.toString().trim());
              this.router.navigate(['/home']);
            } else {
              this.disaplayMessage('Invalid userid and password');
            }

          } else {
            this.disaplayMessage('Invalid userid and password');
          }
        },
        error => {
          this.disaplayMessage(error);
        });
  }

  disaplayMessage(error: string) {
    this.error = error;
    this.loading = false;
  }
}

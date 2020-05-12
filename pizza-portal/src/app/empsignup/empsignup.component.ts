import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {HttpClientService} from '../service/http-client.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-empsignup',
  templateUrl: './empsignup.component.html',
  styleUrls: ['./empsignup.component.css']
})
export class EmpsignupComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: HttpClientService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.isEmployeeLoggedIn()) {
      this.router.navigate(['/pizza']);
    }
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userId: ['', Validators.required],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
      userConfirmPassword: ['', Validators.required],
      email: ['', Validators.required],
      phoneNo: ['', Validators.required]
    }, {validator : PasswordValidation.MatchPassword});
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log('i passed line 43');
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    console.log('i passed line 48');
    this.loading = true;
    this.userService.registerEmployee(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/emplogin'], { queryParams: { registered: true }});
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}

export class PasswordValidation {
  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('userPassword').value;
    const confirmpassword = AC.get('userConfirmPassword').value;
    if (confirmpassword === password) {
      return null;
    } else {
      AC.get('userConfirmPassword').setErrors({MatchPassword: true });
    }
  }
}


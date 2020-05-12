import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {HttpClientService} from '../service/http-client.service';
import {PasswordValidation} from '../empsignup/empsignup.component';
import {first} from 'rxjs/operators';
import {User} from '../service/users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;
  userData : User ;
  eidtable: boolean= false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: HttpClientService
  ) { }

  ngOnInit() {
    this.loadUser();
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

  loadUser(){
    this.userService.getUserDetail(this.authenticationService.getUserName())
      .subscribe(data=> {
        this.userData = data;
      });
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
    this.loading = true;
    console.log(this.registerForm.getRawValue());
    this.userService.updateUser(this.registerForm.value).subscribe(data =>{
      console.log(data);
    });
    this.userData.isEditable=false;


  }

}

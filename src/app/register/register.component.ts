import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users/users.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {response} from 'express';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UsersService, private router: Router) { }

  username;
  password;
  passwordConfirmation;
  email;
  street_name;
  house_number;
  cell_number;
  city: String = 'JOHANNESBURG';

  //user object
  User: any;

  //form validation
  formIsValid = false;
  message;
  isRegister: boolean;
  optValue: any;

  userValidationError;
  isLoading: boolean = false;

  ngOnInit(): void {
  }


  register() {

    if (this.password !== this.passwordConfirmation) {
      console.log('not valid 1')
        this.formIsValid = false;
    } else if (!this.password || !this.passwordConfirmation || !this.username || !this.street_name || !this.cell_number || !this.email || !this.house_number) {
      console.log('not valid 2')
      this.formIsValid = false;
    } else {
      this.isLoading = true;
      this.User = {
        username: this.username,
        password: this.password,
        email: this.email,
        cell_number: this.cell_number,
        house_number: this.house_number,
        city: this.city
      }

      this.userService.createNewUser(this.User).subscribe(createdUser => {
        console.log(createdUser);
        let response: any = createdUser;
        if (response) {
          this.isLoading = false;
          const id: any = response._id;
          localStorage.setItem('userId', id)
          this.isRegister = true;
         // this.router.navigateByUrl('home').then(r => {});
        }
      }, error => {
        console.log(error);
      });

    }

  }


  verifyOTP() {
    let otp_response: any;
    const verifyOtp = {
      userid: localStorage.getItem('userId'),
      otp: this.optValue

    }
    console.log(verifyOtp)
      this.userService.verifyViaOTP(verifyOtp).subscribe(response => {
        otp_response = response;
        if (otp_response.message === 'USER VALIDATED USING OTP') {
          this.router.navigateByUrl('home').then(r => {});
        } else {
          this.userValidationError = true;
        }
      }, error => {
        this.userValidationError = true;
      })
  }
}

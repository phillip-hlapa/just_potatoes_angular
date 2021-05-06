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

  username_name_exists_value = '';
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
  isLoadingOTP: boolean = false;

  userId: any = '';
  registration_verify: any = 'Registration!';
  UserEmail: any = '';
  verify_one_moment: any = 'Verifying you, one moment...';
  text_status: any = 'warning';
  username_exists: boolean = false;
  ngOnInit(): void {

  }


  register() {

    try {
      sessionStorage.removeItem('userId')
    }catch (error) {
      console.log(error)
    }
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
        let response: any = createdUser;
        if (response) {
          if(response.message != null && response.message === 'USERNAME EXISTS'){
            this.username_exists = true;
            this.isLoading = false;
            setTimeout(() => {this.username_exists = false;}, 10000)
            this.username_name_exists_value = this.User.username;
          } else {
            this.isLoading = false;
            const id: any = response._id;
            // sessionStorage.setItem('userId', id)
            this.registration_verify = 'Verify Account'
            this.UserEmail = response.contact.email;
            this.userId = id;
            this.isRegister = true;
            this.username_exists  = false;
          }

         // this.router.navigateByUrl('home').then(r => {});
        }
      }, error => {
        console.log(error);
      });

    }

  }


  verifyOTP() {
    this.isLoadingOTP = true;
    let otp_response: any;
    const verifyOtp = {
      userid: this.userId,
      otp: this.optValue

    }
    console.log(verifyOtp)
      this.userService.verifyViaOTP(verifyOtp).subscribe(response => {
        otp_response = response;
        if (otp_response.message === 'USER VALIDATED USING OTP') {
          sessionStorage.setItem('userId', this.userId)
          this.text_status = 'success';
          this.verify_one_moment = 'verify complete... Taking you to home page!'
          setTimeout(() => {
            this.isLoadingOTP = false;
            this.router.navigateByUrl('home').then(r => {});
          }, 3000)
        } else {
          this.isLoadingOTP = false;
          this.userValidationError = true;
        }
      }, error => {
        this.isLoadingOTP = false;
        this.userValidationError = true;
      })
  }
}

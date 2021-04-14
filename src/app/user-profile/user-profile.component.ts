import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  User: any;
  changeDetails1: boolean = true;

  updated_username: any;
  updated_email: any;
  updated_password: any;
  updated_street_name: any;
  updated_house_number: any;
  updated_cell_number: any;

  updatedUser: boolean = false;
  userCity: any;
  isLoading: boolean = false;
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    // retrieve user Profile
    this.getUser(sessionStorage.getItem('userId'));
    this.isLoading = false;
  }

  getUser(userId) {
    this.isLoading = true;
    this.usersService.getUserById(userId).subscribe(user => {
      this.User = user;
      this.userCity = this.User.address.city;
      if(this.User) {
        this.isLoading = false;
      }
    })
  }

  changeDetails() {
    this.changeDetails1 = false;
  }

  changeDetailsDone(_id: any) {
    this.changeDetails1 = true;

    if (this.updated_password) {
      this.User.password = this.updated_password;
    }
    if(this.userCity) {
      this.User.address.city = this.userCity;
    }
    this.usersService.updateUser(this.User, sessionStorage.getItem('userId')).subscribe(response => {
      if(response) {
        this.User = response;
        this.updatedUser = true;
      }
    })

  }
}

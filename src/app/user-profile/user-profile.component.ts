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

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    // retrieve user Profile
    this.getUser(localStorage.getItem('userId'));

  }

  getUser(userId) {
    this.usersService.getUserById(userId).subscribe(user => {
      this.User = user;
      console.log(user)
    })
  }

  changeDetails() {
    this.changeDetails1 = false;
  }

  changeDetailsDone(_id: any) {
    this.changeDetails1 = true;
    // const updateUser = {
    //   username: this.updated_username,
    //   password: this.updated_password,
    //   contact: {
    //     email: this.updated_email,
    //     cell_number: this.updated_cell_number
    //   },
    //   address: {
    //     house_number: this.updated_house_number,
    //     street_name: this.updated_street_name
    //   }
    // }
    if (this.updated_password) {
      this.User.password = this.updated_password;
    }
    console.log(this.User);
    this.ngOnInit();
  }
}

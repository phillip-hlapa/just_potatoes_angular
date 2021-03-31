import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private usersService: UsersService) { }

User: any;

  ngOnInit() {
    //retrieve user Profile
    this.getUser(localStorage.getItem("userId"));
  }

  getUser(userId) {
    this.usersService.getUserById(userId).subscribe(user => {
      this.User = user;
      console.log(user)
    })
  }

}

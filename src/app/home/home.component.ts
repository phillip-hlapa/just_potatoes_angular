import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  userLoggedIn() {
    return this.usersService.verifyAuth();
  }

  login() {
    this.router.navigateByUrl('login').then(login =>{
      console.log(login)
    })
  }
}

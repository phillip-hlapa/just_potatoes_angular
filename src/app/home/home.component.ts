import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users/users.service";
import {Router} from "@angular/router";
//import {Observable} from "rxjs/Observable";
//import { interval } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    //this.submitRequest();
  }

  // submitRequest() {
  //   interval(5000).subscribe(x => this.usersService.sendTest().subscribe(response => {console.log(response + " HEROKU"); this.usersService.sentTest2().subscribe(response2 => {console.log(response2 + " GLITCH")})}))
  // }

  userLoggedIn() {
    return this.usersService.verifyAuth();
  }

  login() {
    this.router.navigateByUrl('login').then(login =>{
      console.log(login)
    })
  }
}

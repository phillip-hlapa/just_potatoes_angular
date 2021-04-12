import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users/users.service";

@Component({
  selector: 'app-vieworeders',
  templateUrl: './vieworeders.component.html',
  styleUrls: ['./vieworeders.component.css']
})
export class VieworedersComponent implements OnInit {
  UserOrders: any;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUserOrders(localStorage.getItem('userId')).subscribe(orders => {
      this.UserOrders = orders;
    })
  }

}

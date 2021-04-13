import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users/users.service";

@Component({
  selector: 'app-vieworeders',
  templateUrl: './vieworeders.component.html',
  styleUrls: ['./vieworeders.component.css']
})
export class VieworedersComponent implements OnInit {
  UserOrders: any;
  thereIsOrder: boolean = true;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUserOrders(sessionStorage.getItem('userId')).subscribe(orders => {
      this.UserOrders = orders;
      if(!this.UserOrders || this.UserOrders.length == 0) {
        this.thereIsOrder = false;
      } else {
        this.thereIsOrder = true;
      }
    })
  }

}

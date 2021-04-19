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
  mailSent: boolean = false;
  isLoading: boolean = false;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.mailSent = false;
    this.isLoading = true;
    this.usersService.getUserOrders(sessionStorage.getItem('userId')).subscribe(orders => {
      this.UserOrders = orders;
      if(!this.UserOrders || this.UserOrders.length == 0) {
        this.thereIsOrder = false;
        this.isLoading = false;
      } else {
        this.thereIsOrder = true;
        this.isLoading = false;
      }
    })
  }

  public isMailSent() {
    return this.mailSent;
  }
  public getSlip(orderId){
    let orderDetails = {
      userId: sessionStorage.getItem('userId'),
      orderId: orderId
    }
    this.usersService.getUserSlip(orderDetails).subscribe(slipResponse => {
        if(slipResponse) {
          console.log(slipResponse);
          this.mailSent = true;


          setTimeout(() => {
            this.mailSent = false;
          }, 3000);

        }
    })
  }
}

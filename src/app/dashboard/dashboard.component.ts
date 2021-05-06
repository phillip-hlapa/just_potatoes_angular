import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { ProductService } from '../../services/products/product.service';
import * as Chartist from 'chartist';
import {MessagesService} from "../../services/messages/messages.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


// USERS
Users: any;
UsersSize = 0;
userIsAdmin = false;
UserRole: any = ['ADMIN', 'SUPERUSER', 'NORMAL']
UserRoleCount = 0;
// Orders
Orders: any;
OrderByUser: any = null;
order_id: any;
order_status: any;


//
revenue = 0;

//spinner
isLoading: boolean = false;

revenueIsLoading: boolean = false;
UsersSizeIsLoading: boolean = false;
MessageLengthIsLoading: boolean = false;
FollowersIsLoading: boolean = false;

ManageOrdersIsLoading: boolean = false;
ManageUsersIsLoading: boolean = false;

  // deleting users
    acceptedOrder = false;
    role: any;
    Messages: any;
    MessageLength: any;



  constructor(private messagesService: MessagesService, private usersService: UsersService, private productService: ProductService) { }
  startAnimationForLineChart(chart) {
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  }  startAnimationForBarChart(chart) {
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if (data.type === 'bar') {
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  }  ngOnInit() {
     this.revenueIsLoading = true;
     this.UsersSizeIsLoading = true;
     this.MessageLengthIsLoading = true;
     this.FollowersIsLoading = true;

     this.ManageOrdersIsLoading =  true;
     this.ManageUsersIsLoading = true;
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */


      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      const completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      const datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      const optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      const responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      const websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      // start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);

      this.loadUsers();

      this.productService.getOrders().subscribe(response => {
          this.Orders = response;
          if (this.Orders) {
              this.ManageOrdersIsLoading =  false;
              this.calculateRevenue(this.Orders);
          }
      }, error => {
          console.log(error)
      })

      // get user role
      this.getUserRole();
      this.getMessages();
      this.isLoading = false;

      //stop button load
        this.order_id = {};
        this.order_status = {};


  }

  public loadUsers() {
      this.usersService.getUsers().subscribe(users => {
          this.Users = users;
          this.UsersSize = this.Users.length;
          if(users) {
              this.UsersSizeIsLoading = false;
              this.ManageUsersIsLoading = false;
          }
      })
  }
  onDelete(userId, button: HTMLButtonElement) {
      console.log(userId)
      button.value = 'loading';
      this.usersService.deleteUser(userId).subscribe(message => {
          if(message) {
              this.loadUsers()
          }
      })
      //this.ngOnInit();
  }

  // update user role
    onUpdateRole(_id: any, button: HTMLButtonElement) {
      this.UserRoleCount++;
      button.value = 'loading'
      if (this.UserRoleCount === 3) {
          this.UserRoleCount = 0;
      }
        const userRole = {
            userId: _id,
            role: this.UserRole[this.UserRoleCount]
        }
        this.usersService.updateRole(userRole).subscribe(userRoleResponse => {
            if (userRoleResponse) {
                this.Users.forEach(user => {
                    if(user._id === _id) {
                        user.role = userRole.role;
                        button.value = ''
                        return
                    }
                })

                //this.ngOnInit();
            }
        })
    }

    getUserRole() {
      this.usersService.getUserById(sessionStorage.getItem('userId')).subscribe(userResponse => {
          const user: any = userResponse;
          if (user.role === 'ADMIN' || user.role === 'SUPERUSER') {
              this.userIsAdmin = true;
          } else {
              this.userIsAdmin = false;
          }
      }, error => {
          this.userIsAdmin = false;
      })
    }

    acceptOrder(order: any, button: HTMLButtonElement) {
      this.isLoading = true;
       button.value = 'loading'
        this.productService.acceptOrder(order._id).subscribe(acceptedOrder => {
            console.log(acceptedOrder);
            if (acceptedOrder) {
                this.acceptedOrder = true;
                this.Orders.forEach(orderItem => {
                    if(order._id == orderItem._id) {
                        orderItem.order_status = 'ACCEPTED'
                        button.value = ''
                    }
                })
            }
            //this.ngOnInit();
        })
    }

    // order management
    declineOrder(order: any, button: HTMLButtonElement) {
        this.isLoading = true;
        button.value = 'loading'
        this.productService.declineOrder(order._id).subscribe(declinedOrder => {
            if(declinedOrder) {
               // this.acceptedOrder = true;
                this.Orders.forEach(orderItem => {
                    if(order._id === orderItem._id) {
                        orderItem.order_status = 'DECLINED'
                        button.value = ''
                    }
                })
            }
           // this.ngOnInit() ;
        })
    }
    dispatchOrder(order: any, button: HTMLButtonElement) {
        this.isLoading = true;
        button.value = 'loading'
        this.productService.dispatchOrder(order._id).subscribe(dispatchOrder => {
            if(dispatchOrder) {
                    //this.acceptedOrder = true;
                    this.Orders.forEach(orderItem => {
                        if(order._id === orderItem._id) {
                            orderItem.order_status = 'DISPATCHED'
                            button.value = ''
                        }
                    })
            }
           // this.ngOnInit();
        })
    }

    reverseOrder(order: any, button: HTMLButtonElement) {
        this.isLoading = true;
        button.value = 'loading'
        this.productService.reverseOrder(order._id).subscribe(reverseOrder => {
           if(reverseOrder) {
               this.acceptedOrder = true;
               this.Orders.forEach(orderItem => {
                   if(order._id === orderItem._id) {
                       orderItem.order_status = 'ACCEPTED'
                       button.value = ''
                   }
               })
           }
           // this.ngOnInit();
        })
    }


    getUserOrder(orderId: any) {

        this.productService.getOrderById(orderId).subscribe(userOrderResponse => {
            this.OrderByUser = userOrderResponse;
            console.log(this.OrderByUser)
        }, error => {
            console.log(error)
        })
    }
    // revenue calculation


    calculateRevenue(orders: any) {
      orders.forEach(order => {
          this.revenue = this.revenue + order.order_total;
          if(order) {
              this.revenueIsLoading = false;
              this.FollowersIsLoading = false;
          }
      })
    }
    getMessages() {
        const UserId = sessionStorage.getItem('userId');
        this.usersService.getUserById(UserId).subscribe(response => {
            if (response) {
                const user: any = response;
                if (user.role === 'ADMIN') {
                    this.messagesService.getAllMessages().subscribe(messages => {
                        this.Messages = messages;
                        this.MessageLength = this.Messages.length;
                    }, err => {
                        console.log(err)
                    });
                } else {
                    this.messagesService.getUserMessage(UserId).subscribe(messages => {
                        this.Messages = messages;
                        this.MessageLength = this.Messages.length;
                    }, err => {
                        console.log(err)
                    });
                }
                this.MessageLengthIsLoading = false;
            }
        }, error => {})
        this.isLoading = false;
    }
}

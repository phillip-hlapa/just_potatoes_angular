import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { ProductService } from "../../services/products/product.service";
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

//USERS
Users: any;
UsersSize = 0;
userIsAdmin = false;
UserRole: any = ["ADMIN", "SUPERUSER", "NORMAL"]
UserRoleCount = 0;
//Orders
Orders: any;
OrderByUser: any = null;


  constructor(private usersService: UsersService, private productService: ProductService) { }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
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
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
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
  };
  ngOnInit() {
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

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

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

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);

      this.usersService.getUsers().subscribe(users => {
        this.Users = users;
        this.UsersSize = this.Users.length;
        console.log(users)
      })

      this.productService.getOrders().subscribe(response => {
          console.log(response)
          this.Orders = response;
      }, error => {
          console.log(error)
      })

      //get user role
      this.getUserRole();

  }

  //deleting users
    acceptedOrder: boolean = false;
    role: any;
  onDelete(userId) {
      console.log(userId)
      this.usersService.deleteUser(userId).subscribe(message => {console.log(message)})
      this.ngOnInit();
  }

  //update user role
    onUpdateRole(_id: any) {
        this.UserRoleCount++;
      if(this.UserRoleCount == 3) {
          this.UserRoleCount = 0;
      }
        console.log(_id);
        let userRole = {
            userId: _id,
            role: this.UserRole[this.UserRoleCount]
        }
        this.usersService.updateRole(userRole).subscribe(userRoleResponse => {
            if(userRoleResponse){
                this.ngOnInit();
            }
        })
    }

    getUserRole() {
      this.usersService.getUserById(localStorage.getItem('userId')).subscribe(userResponse => {
          let user: any = userResponse;
          if(user.role === 'ADMIN' || user.role === 'SUPERUSER'){
              this.userIsAdmin = true;
          } else {
              this.userIsAdmin = false;
          }
      }, error => {
          this.userIsAdmin = false;
      })
    }

    acceptOrder(_id: any) {
        this.productService.acceptOrder(_id).subscribe(acceptedOrder => {
            console.log(acceptedOrder);
            if(acceptedOrder) {
                this.acceptedOrder = true;
            }
            this.ngOnInit();
        })
    }

    //order management
    declineOrder(_id: any) {
        this.productService.declineOrder(_id).subscribe(declinedOrder => {console.log(declinedOrder); this.ngOnInit();})
    }
    dispatchOrder(_id: any) {
        this.productService.dispatchOrder(_id).subscribe(dispatchOrder => {console.log(dispatchOrder); this.ngOnInit();})
    }

    reverseOrder(_id: any) {
        this.productService.reverseOrder(_id).subscribe(reverseOrder => {console.log(reverseOrder); this.ngOnInit();})
    }


    getUserOrder(orderId: any) {
        this.productService.getOrderById(orderId).subscribe(userOrderResponse => {
            this.OrderByUser = userOrderResponse;
            console.log(this.OrderByUser)
        }, error => {
            console.log(error)
        })
    }
}

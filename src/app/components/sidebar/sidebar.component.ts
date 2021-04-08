import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../services/users/users.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/home', title: 'Home',  icon: 'home',  class: '' },
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon: 'person', class: '' },
    { path: '/view-my-orders', title: 'View My Orders',  icon: 'content_paste', class: '' },
    { path: '/manage-orders', title: 'Manage Orders',  icon: 'unarchive', class: 'active-pro'},
    { path: '/contact-admin', title: 'Contact Admin',  icon: 'library_books', class: '' },
    { path: '/notifications', title: 'Notifications',  icon: 'notifications', class: '' },
    { path: '/products', title: 'Products',  icon: 'add_shopping_cart', class: '' },
    { path: '/create-order', title: 'Create Order',  icon: 'local_shipping', class: '' },
    { path: '/login', title: 'Login',  icon: 'login', class: ''},
    { path: '/logout', title: 'Logout',  icon: 'logout', class: ''},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  authenticated = false;
  constructor(public userService: UsersService) { }

  ngOnInit() {
      this.userService.verifyAuth();
      this.userService.verifyUserRole();
      this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}

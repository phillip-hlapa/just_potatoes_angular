import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users/users.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private userService: UsersService) { }

  ngOnInit(): void {
    console.log('logging out')
    localStorage.clear();
    this.router.navigateByUrl('home').then(homeNav => {

    });
  }

}

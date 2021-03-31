import { Component, OnInit } from '@angular/core';
import { UsersService} from "../../services/users/users.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorLogin: string = null;

  constructor(private router: Router, private userService: UsersService) { }

  username;
  password;

  UserLogin: any;
  UserLoginResponse: any;

  ngOnInit(): void {
    this.errorLogin = null;
  }

  doLogin() {
    this.UserLogin = {
      username: this.username,
      password: this.password
    }

    this.userService.Login(this.UserLogin).subscribe(response => {
      console.log(response)
      this.UserLoginResponse = response;
      if(response){
        localStorage.setItem("userId", this.UserLoginResponse.userId)
        console.log(localStorage.getItem("userId"))
        console.log(this.UserLoginResponse.message)
        if(this.UserLoginResponse.message != null && this.UserLoginResponse.message === 'NOT FOUND') {
          this.errorLogin = 'you will need to register!';
        }
        else if(this.UserLoginResponse.role != 'ADMIN'){
          this.router.navigateByUrl('home').then(r => {});
        }
        else if(this.UserLoginResponse.role === 'ADMIN') {
          this.router.navigateByUrl('dashboard').then(r => {});
        }


      }
    }, error =>{
      console.log(error)
    })
  }

}

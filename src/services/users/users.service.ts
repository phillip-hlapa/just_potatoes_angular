import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //endpoint_url = "http://192.168.39.233"
  endpoint_url = "https://damp-sands-73285.herokuapp.com"
  //endpoint_url = "http://localhost:1993"

  constructor(private httpClient: HttpClient) { }

  //get all users
  public getUsers(): Observable<Object> {
    return this.httpClient.get(this.endpoint_url + '/api/users');
  }
  public getUserById(userId): Observable<Object> {
    return this.httpClient.get(this.endpoint_url + '/api/users/' + userId)
  }

  public createNewUser(User: any): Observable<Object> {
        return this.httpClient.post(this.endpoint_url + '/api/users/create', User);
  }
  public Login(User: any): Observable<Object> {
    return this.httpClient.post(this.endpoint_url + '/api/users/find', User);
  }

  public deleteUser(userId: any) : Observable<Object> {
    return this.httpClient.delete(this.endpoint_url + '/api/users/' + userId);
  }
  public updateRole(user_role: any) : Observable<Object>  {
      return this.httpClient.post(this.endpoint_url + '/api/users/update_role', user_role);
  }

    public isAuthenticated() {
        this.getUserById(localStorage.getItem("userId")).subscribe(user => {
          if(user) {
            let FoundUser: any = user;
            if(FoundUser != null && FoundUser._role != null) {
              return true;
            }
          }
          return false;
        })
      return  false;
    }

   public verifyViaOTP(optValue: any) : Observable<Object>  {
      return this.httpClient.post(this.endpoint_url + '/api/users/validate', optValue);

    }


}

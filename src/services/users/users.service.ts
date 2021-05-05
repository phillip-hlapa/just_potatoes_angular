import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../app/debug/env'
@Injectable({
  providedIn: 'root'
})
export class UsersService {

       endpoint_url = environment.prod_url_heroku;

  constructor(private httpClient: HttpClient) { }

  // get all users
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
        this.getUserById(sessionStorage.getItem('userId')).subscribe(user => {
          if (user) {
            const FoundUser: any = user;
            if (FoundUser != null && FoundUser._role != null) {
              return true;
            }
          }
          return false;
        })
      return  false;
    }
   public verifyViaOTP(optValue: any): Observable<Object>  {
      return this.httpClient.post(this.endpoint_url + '/api/users/validate', optValue);

    }
   public updateUser(User: any, userId: string): Observable<Object> {
       console.log(User)
       console.log(userId)
       return this.httpClient.post(this.endpoint_url + '/api-v2/users/update/'+ userId, User);
   }
    public verifyAuth(): boolean {
      const auth = sessionStorage.getItem('userId')
        if (auth) {
            return true;
        } else {
            return false;
        }
    }
    public verifyUserRole(): boolean {
      const userRole = sessionStorage.getItem('userRole')
        if (userRole === 'NORMAL') {
            return false;
        } else {
            return true;
        }
    }

    public getUserOrders(userId): Observable<Object> {
        return this.httpClient.get(this.endpoint_url + '/api/orders/user/' + userId)
    }
    public getUserSlip(orderDetails: any): Observable<Object> {
      return this.httpClient.post(this.endpoint_url + '/api-v2/users/slip', orderDetails);
    }

    public sendTest(): Observable<Object>  {
        return this.httpClient.get(this.endpoint_url + '/api/test');
    }

    sentTest2(): Observable<Object>  {
        return this.httpClient.get(environment.prod_url_glitch + '/api/test');
    }

}

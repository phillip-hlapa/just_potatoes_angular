import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // endpoint_url = "http://192.168.39.233"
  // endpoint_url = 'https://damp-sands-73285.herokuapp.com'
     endpoint_url = 'https://cherry-cobbler-84144.herokuapp.com';
  // endpoint_url = 'http://localhost:1993'

  constructor(private httpClient: HttpClient) { }

  public getProducts(): Observable<Object> {
    return this.httpClient.get(this.endpoint_url + '/api/products');
  }
  public createProduct(product: any): Observable<Object> {
    return this.httpClient.post(this.endpoint_url + '/api/products/create', product);
  }

  public getProduct(productId: any): Observable<Object> {
    return this.httpClient.get(this.endpoint_url + '/api/products/' + productId);
  }

  //Orders
   public submitOrder(orderDetails: any): Observable<Object> {
     return this.httpClient.post(this.endpoint_url + '/api/orders/create', orderDetails);
    }
  public getOrders(): Observable<Object> {
    return this.httpClient.get(this.endpoint_url + '/api/orders');
  }

  public acceptOrder(_id: any) : Observable<Object> {
    return this.httpClient.get(this.endpoint_url + '/api/orders/accept/' + _id);
  }

  declineOrder(_id: any): Observable<Object> {
    return this.httpClient.get(this.endpoint_url + '/api/orders/decline/' + _id);
  }

  dispatchOrder(_id: any) {
    return this.httpClient.get(this.endpoint_url + '/api/orders/dispatch/' + _id);
  }

  reverseOrder(_id: any): Observable<Object>  {
    return this.httpClient.get(this.endpoint_url + '/api/orders/reverse/' + _id);
  }

    getOrderById(orderId: any) : Observable<Object> {
      return this.httpClient.get(this.endpoint_url + '/api/orders/' + orderId);
    }
}

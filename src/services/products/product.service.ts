import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../app/debug/env'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   // endpoint_url = 'http://localhost:1993'
    endpoint_url = environment.prod_url_glitch;

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

  public  getOrderById(orderId: any) : Observable<Object> {
      return this.httpClient.get(this.endpoint_url + '/api/orders/' + orderId);
    }

  public updateProduct(Edit_Product: any): Observable<Object> {
      return this.httpClient.post(this.endpoint_url + '/api-v2/products/update', Edit_Product);
    }
}

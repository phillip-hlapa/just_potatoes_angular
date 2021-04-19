import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../app/debug/env'

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private httpClient: HttpClient) { }

  endpoint_url = environment.prod_url_glitch;

  public getLogs(limit: any, skip: any): Observable<Object> {
    return this.httpClient.get(this.endpoint_url + '/api-v2/logs/' + sessionStorage.getItem('userId') + '?limit=' + limit + '&skip=' + skip);
  }
}

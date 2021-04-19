import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../app/debug/env'

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  endpoint_url = environment.prod_url_glitch;

  constructor(private httpClient: HttpClient) { }

  public getAllMessages(): Observable<Object> {
    return this.httpClient.get(this.endpoint_url + '/api/messages');
  }
  public createMessage(message: any): Observable<Object> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post(this.endpoint_url + '/api/messages/create', message); // message: 'sender=userid' , 'message_header' 'message'
  }
  public deleteMessage(messageId): Observable<Object> {
    return this.httpClient.delete(this.endpoint_url + '/api/messages/' + messageId); // messageId
  }
  public getUserMessage(userId): Observable<Object> {
    return this.httpClient.get(this.endpoint_url + '/api/messages/' + userId); // userId
  }
  public createMessageConversation(text: any): Observable<Object> {
    return this.httpClient.post(this.endpoint_url + '/api/messages/text', text); // text: 'messageId' will be required and variable 'text'
  }

}

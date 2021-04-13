import { Component, OnInit } from '@angular/core';
import {MessagesService} from '../../services/messages/messages.service';
import {UsersService} from '../../services/users/users.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements OnInit {
   message_header: any;
   message: any;
   replyFrom: any;
   MessageLength: any;
   Messages: any
   isReply: boolean = false;
   // reply text
   reply: any;

   // spinnners
  isLoading: boolean = false;
  isAdmin: boolean = false;
  constructor(private messagesService: MessagesService, private userService: UsersService) { }

  ngOnInit(): void {
    this.message_header = '';
    this.message = '';
    this.reply = '';
    this.getMessages();
    this.isAdmin = this.userService.verifyUserRole()
  }

  createMessage() {
    const message = {
      message_header: this.message_header,
      sender: sessionStorage.getItem('userId'),
      message: this.message,
    }
    console.log(message);
    this.messagesService.createMessage(message).subscribe(response => {
      console.log(response)
      if (response) {
        this.ngOnInit();
      }
    }, error => {
      console.log(error)
    })
  }

  getMessages() {
    const UserId = sessionStorage.getItem('userId');
    this.userService.getUserById(UserId).subscribe(response => {
      if (response) {
        const user: any = response;
        this.replyFrom = user.username;
        console.log(user.role)
        if (user.role === 'ADMIN') {
          this.messagesService.getAllMessages().subscribe(messages => {
            console.log(messages)
            this.Messages = messages;
            this.MessageLength = this.Messages.length;
          }, err => {
            console.log(err)
          });
        } else {
          this.messagesService.getUserMessage(UserId).subscribe(messages => {
            console.log(messages)
            this.Messages = messages;
            this.MessageLength = this.Messages.length;
          }, err => {
            console.log(err)
          });
        }
      }
    }, error => {})
    this.isLoading = false;
  }


  isReplyMessage() {
    this.isReply = true;
  }

  replyMessage(messageId: any, replyValue) {
    this.isLoading = true;
    console.log(this.reply)
    const text: any = {
      messageId: messageId,
      text: replyValue,
      replyFrom: this.replyFrom
    };

    this.messagesService.createMessageConversation(text).subscribe(response => {
      if (response) {
        this.ngOnInit();
      }
    })
    console.log(messageId)
    console.log(this.replyMessage)
  }

  deleteMessage(messageId: any) {
      this.messagesService.deleteMessage(messageId).subscribe(deletedMessage => {
        if(deletedMessage){
          console.log('message deleted')
        }
      })
    this.ngOnInit();
  }
}

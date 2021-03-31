import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages/messages.service';
import { UsersService} from "../../services/users/users.service";

declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

Messages: any;
MessageLength: any;
MessageIndex = -1;

message_header: any;
message: any;

replyMessage: any;

  constructor(private messagesService: MessagesService, private userService: UsersService) { }
  showNotification(from, align){

      if(this.MessageIndex < this.MessageLength){
        this.MessageIndex++;
      } else {
        this.MessageIndex = 0;
      }

      const type = ['','info','success','warning','danger'];

      const color = Math.floor((Math.random() * 4) + 1);

      $.notify({
          icon: "notifications",
          message: this.Messages[this.MessageIndex < this.MessageLength ? this.MessageIndex : 0].message

      },{
          type: type[color],
          timer: 4000,
          placement: {
              from: from,
              align: align
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }

deleteMessage(messageId) {
  this.messagesService.deleteMessage(messageId).subscribe(deletedMessages => {
    console.log(deletedMessages);
  });
}

createMessage() {
    let message = {
        message_header: this.message_header,
        sender: localStorage.getItem("userId"),
        message: this.message,
    }
    console.log(message);
    this.messagesService.createMessage(message).subscribe(response => {
        console.log(response)
        if(response) {
            this.ngOnInit();
        }
    }, error => {
        console.log(error)
    })
}

  ngOnInit() {
      this.replyMessage = '';
      let UserId = localStorage.getItem('userId');
      this.userService.getUserById(UserId).subscribe(response => {
          if(response) {
              let user: any = response;
              console.log(user.role)
              if(user.role === 'ADMIN') {
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

  }

    reply(_id: any) {
      let text: any = {
          messageId: _id,
          text: this.replyMessage
      };

      this.messagesService.createMessageConversation(text).subscribe(response => {
          if(response) {
              console.log(response)
              this.ngOnInit();
          }
      })
        console.log(_id)
        console.log(this.replyMessage)
    }
}

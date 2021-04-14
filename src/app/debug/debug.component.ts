import { Component, OnInit } from '@angular/core';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator'
import {LogsService} from "../../services/logs/logs.service";
@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {
  length: any = 100;
  pageIndex: any;
  pageSize: any;
  pageEvent: any;
  Logs: any;


   isLoading: boolean = false;
   showError: boolean = false;

  constructor(private logsService: LogsService) { }



  ngOnInit(): void {
    this.getLogs(100, 1);
  }

  getServerData($event: PageEvent) {
    console.log(PageEvent)

  }

  getLogs(limit: any, skip: any) {
    this.isLoading = true;
    this.logsService.getLogs(limit ? limit : 30, skip ? skip : 1).subscribe(logs => {
      if(logs) {
        this.Logs = logs;
        this.isLoading = false;
        if(this.Logs.status && this.Logs.status === 'forbidden') {
          this.showError = true;
        } else {
          this.showError = false;
        }
      }
    })
  }
}


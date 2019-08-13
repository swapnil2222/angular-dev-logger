import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/models/Log';
import { LogService } from 'src/app/services/log.service';
// import { Observable, of, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs: Log[];
  selectedLog: Log;
  loaded: boolean = false

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.stateClear.subscribe(clear => {
      if (clear) {
        this.selectedLog = {
          id: '',
          text: '',
          date: ''
        }
      }
    })
     this.logService.getLogs().subscribe(logsList=>{
      this.logs=logsList
     })
  }
  onSelect(log: Log) {
    this.logService.setFormLog(log)
    this.selectedLog=log
  }
  onDelete(log: Log) {
    if (confirm('Are you sure?')) {
      this.logService.deleteLog(log)
    }
  }
}

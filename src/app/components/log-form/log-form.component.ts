import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id: string
  text: string
  date: any
  isNewLog: boolean = true
  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.selectedLog.subscribe(log => {
      // console.log(log)
      if (log.id !== null) {
        this.id = log.id
        this.text = log.text
        this.date = log.date
        this.isNewLog = false
      }
    })
  }
  onSubmit() {
    // this.isNewLog=true
    if (this.isNewLog) {
      // create a new log
      const newLog = {
        id: this.uuidv4(),
        text: this.text,
        date: new Date()
      }
      // add new log service
      this.logService.addLog(newLog);
      // this.clearData()
    } else {
      console.log('updating..')
      // update log
      const updateLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      }
      this.logService.updateLog(updateLog);
    }
    this.clearData()
  }
  clearData() {
    console.log('called')
    this.isNewLog = true
    this.id = ''
    this.text = ''
    this.date = ''
    this.logService.clearState()
  }
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

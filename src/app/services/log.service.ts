import { Injectable } from '@angular/core';
import { Log } from '../models/Log';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[]

  private logSource = new BehaviorSubject<Log>({ id: null, text: null, date: null })
  selectedLog = this.logSource.asObservable()
  private stateSource = new BehaviorSubject<boolean>(true)
  stateClear = this.stateSource.asObservable()

  constructor() {
    // this.logs = [
    //   { id: '1', 'text': 'Generated Component', date: new Date('10/11/12') },
    //   { id: '2', 'text': 'Added Login', date: new Date('10/11/12') },
    //   { id: '3', 'text': 'Refactored Code', date: new Date('10/11/12') }
    // ]
    this.logs = []
    this.getLogs()
  }
  getLogs() {
    if (localStorage.getItem('logs') !== null) {
      this.logs= JSON.parse(localStorage.getItem('logs'))
    }
    return of(this.logs)
  }
  setFormLog(log: Log) {
    this.logSource.next(log)
  }
  addLog(log: Log) {
    this.logs.unshift(log)
    localStorage.setItem('logs', JSON.stringify(this.logs))
  }
  updateLog(log: Log) {
    this.logs.forEach((curLog, index) => {
      if (curLog.id === log.id) {
        this.logs.splice(index, 1)
      }
    })
    this.logs.unshift(log)
    localStorage.setItem('logs', JSON.stringify(this.logs))
  }
  deleteLog(log: Log) {
    this.logs.forEach((l, index) => {
      if (l.id === log.id) {
        this.logs.splice(index, 1)
      }
    })
    localStorage.setItem('logs', JSON.stringify(this.logs))
  }
  clearState() {
    this.stateSource.next(true)
  }
}

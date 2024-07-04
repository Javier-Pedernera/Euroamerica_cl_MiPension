import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private events: { [key: string]: Subject<any> } = {};

  subscribe(event: string, callback: (data: any) => void): void {
    if (!this.events[event]) {
      this.events[event] = new Subject<any>();
    }
    this.events[event].subscribe(callback);
  }

  publish(event: string, data: any): void {
    if (!this.events[event]) {
      this.events[event] = new Subject<any>();
    }
    this.events[event].next(data);
  }
}
import { Injectable } from '@angular/core';
import { Schedule } from '../schedule/classes/schedule';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
private search: any;
private ticket: any;
private schedules = [];
private passengers = [];
  constructor() { }

  setsearch(search) {
    localStorage.setItem('search', JSON.stringify(search));
    this.search = search;
  }

  getSearch() {
    return JSON.parse(localStorage.getItem('search'));
    //  this.search;
  }

  setTicket(ticket: Schedule) {
    localStorage.setItem('ticket', JSON.stringify(ticket));
    this.ticket = ticket;
  }

  getTicket() {
    return JSON.parse(localStorage.getItem('ticket'));
  }

  setSchedules(schedules: Schedule[]) {
    localStorage.setItem('schedules', JSON.stringify(schedules));
    this.schedules = schedules;
  }

  getschedules() {
    return JSON.parse(localStorage.getItem('schedules'));
  }

  setPassengers(passengers: any[]) {
    this.passengers = passengers;
  };

  getPassengers() {
    return this.passengers;
  }
}

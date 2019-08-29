import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private tickets: any[];
  private ticketsUpdated = new Subject<any[]>();

  constructor(
    private http: HttpClient
  ) { }

    getTickets() {
      return this.tickets;
    }

    getTicketsUpdatedListener() {
      return this.ticketsUpdated.asObservable();
    }

  getAllTickets() {
    this.http.get<any[]>('http://104.248.174.205/ticket/station/')
  .subscribe(
            data => {
              this.tickets = data;
              this.ticketsUpdated.next([...this.tickets]);
            }
        );
  }

  searchTicket(search: any) {
    this.http.post('http://104.248.174.205/ticket/check_price/', search)
    .subscribe((data: any[]) => {
      this.tickets = data;
      this.ticketsUpdated.next([...this.tickets]);
      console.log(this.tickets);
    });

  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private http: HttpClient,
    private searchService: SearchService
  ) { }
  ticket = this.searchService.getTicket();
  search = this.searchService.getSearch();

  makeReservation() {
    // const reservation = {
    //   train_id: this.ticket.id,
    //   reservation_date: this.search.check_date1,
    //   age_group: this.searchService.getPassengers(),
    //   no_of_person: 1,

    //   return_date: this.search.return_date1,
    //   user: 5,
    //   class_type: 1,
    //   reservation_status: 1,
    //   schedule: 2,
    //   choice_type: 1
    // };
    // console.log(reservation)
    let reservation = {
      train_id: this.ticket.id,
      reservation_date: '2019-07-09',
      no_of_person: 1,
      age_group: [],

      return_date: '2019-07-09',
      user: 5,
      class_type: 1,
      reservation_status: 2,
      schedule: 2,
      choice_type: 1
  };

    console.log(reservation);
    return this.http.post<{id: string}>('http://104.248.174.205/ticket/reservation/', reservation);
  }

  getReservation(id) {
    return this.http.get(`http://104.248.174.205/ticket/reservation/${id}`);
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { homeApiService } from '../home/services/homeapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from './classes/reservation';
import { ReservationService } from '../services/reservation.service';

import * as jsPDF from 'jspdf';
import { TicketsService } from '../services/ticket.service';
import { Subscription } from 'rxjs';
import { SearchService } from '../services/search.service';
import { Schedule } from '../schedule/classes/schedule';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit {
  schedules: Schedule [];
  adults: Schedule[];
  children: Schedule[];
  Trains: Schedule [];
  prices = [];
  total;
  tickets;
  ticket;
  passengers = [];
  ticketSub = new Subscription();
  public myAngularxQrCode: string = null;


  constructor(
    http: HttpClient,
    private _homeApiService: homeApiService,
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private ticketService: TicketsService,
    private searchService: SearchService
    ) {
    this.myAngularxQrCode = 'Digital Solutions';
  }

  reservation;
  lstReservation;


  jsonSchedule: any = [];
  id;

  @ViewChild('content') content: ElementRef;

  onDownloadPDF() {
    let doc = new jsPDF();
    let specialElementHandlers = {
      '#editor': function(element, renderer) {
        return true;
      }
    };
    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });
    doc.save('secureFare.pdf');
  }


  arrSum(arr) {
    return arr.reduce(function(a, b){
      return a + b;
    }, 0);
  }

  ngOnInit() {
    this.ticket = this.searchService.getTicket();
    this.schedules = this.searchService.getschedules();
    let adults = this.schedules.filter((ticket: Schedule) => {
      return ticket.ages === 'Adult';
    });
    this.adults = adults;
    let children = this.schedules.filter((ticket: Schedule) => {
      return ticket.ages === 'Children';
    });
    this.children = children
    this.prices = this.schedules.map((schedule) => {
      return schedule.amount;
    });
    this.total = this.arrSum(this.prices);
    this.id = this.route.snapshot.paramMap.get('id');
    this.reservationService.getReservation(this.id)
    .subscribe((data) => {
      console.log(data);
      this.reservation = data;
    });

    this.tickets = this.ticketService.getTickets();
    this.ticketSub = this.ticketService.getTicketsUpdatedListener()
    .subscribe((ticket) => {
      this.ticket = this.ticket;
    });

    this.passengers = this.searchService.getPassengers();
    setInterval(() => {
      this.schedules = this.searchService.getschedules();
      let adults = this.schedules.filter((ticket: Schedule) => {
        return ticket.ages === 'Adult';
      });
      this.adults = adults;
      let children = this.schedules.filter((ticket: Schedule) => {
        return ticket.ages === 'Children';
      });
      this.children = children
      this.prices = this.schedules.map((schedule) => {
        return schedule.amount;
      });
      this.total = this.arrSum(this.prices);
      // this.passengers = this.searchService.getPassengers();
      // console.log(this.passengers);
    }, 10000);

    // console.log(this.passengers);


    // const id = this.route.snapshot.paramMap.get('id');

    // this._homeApiService.getReservation(id)
    // .subscribe (
    //   data =>
    //   {
    //     this.lstReservation= data;
    //     console.log(this.lstReservation);
    //   }
    // );

    // const listSchedule = localStorage.getItem("lstSchedule");

    // this.jsonSchedule = JSON.parse(listSchedule);

    // this.total = this.jsonSchedule.reduce((sum,sch)=>sch.amount + sum, 0);

  }



}

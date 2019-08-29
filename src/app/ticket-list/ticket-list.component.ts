import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../services/ticket.service';
import { StationsService } from '../services/stations.service';
import { SearchService } from '../services/search.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { Schedule } from '../schedule/classes/schedule';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Schedule[];
  stations: Schedule[];
  isLoading = true;
  search: any;
  quantity = 0;
  price = 100;
  total: number[];
  pticket = {
    quantity: 0,
    price: 0,
    total: 0
  }
  schedule = [];

  constructor(
    private ticketService: TicketsService,
    private stationsService: StationsService,
    private searchService: SearchService,
    private cartService: CartService,
    private router: Router
  ) { }

  changeLoad() {
    if(this.tickets.length <= 0) {
      this.isLoading = true;
    }
  }

  getTickets() {
    this.tickets = this.ticketService.getTickets();
    this.ticketService.getTicketsUpdatedListener()
    .subscribe((tickets) => {
      this.tickets = tickets;
      this.isLoading = false;
      console.log(this.tickets);
    });
  }

  ngOnInit() {
    this.search = this.searchService.getSearch();
    this.ticketService.searchTicket(this.search);
    console.log(this.search);
    this.stations = this.stationsService.getStations();
    this.getTickets();
    setInterval(() => {
      this.getTickets();
    }, 10000);
    // this.changeLoad();
  }

  onPick(ticket) {
    this.searchService.setTicket(ticket);
  }

  onAdd(ticket) {
    // this.schedule.push(ticket);
    console.log(ticket);
    this.schedule.push(ticket);
    console.log(this.schedule);

    // this.cartService.addProductToCart(ticket);
  }

  onBuy() {
    this.searchService.setSchedules(this.schedule);
    this.router.navigate(['add-passengers']);
  }
}

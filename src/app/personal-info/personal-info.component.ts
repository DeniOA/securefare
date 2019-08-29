import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ReservationService } from '../services/reservation.service';
import { Router } from '@angular/router';
import { Schedule } from '../schedule/classes/schedule';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  schedules: Schedule [];
  adults: Schedule [];
  children: Schedule [];
  prices = [];
  total;
  title = 'App';
  ticket: any;
  ageGroup = [];
  search;

  showEmbed = false;
  results = {
    name: ''
  };
  tRef = '';
  result = '';

  user = {
    firstname: 'Chioma',
    lastname: 'peace',
    phone_number: '070-secure-fare',
    gennder: '2',
    next_of_kin_name: 'Adenike Afonja' ,
    next_of_kin_phone: '07066716846'
  }

  profileForm = this.fb.group({
    fullname: [`${this.user.firstname} ${this.user.lastname}`, Validators.required],
    firstname: [`${this.user.firstname}`, Validators.required],
    lastname: [`${this.user.lastname}`, Validators.required],
    gender: [this.user.gennder, Validators.required],
    next_of_kin: [this.user.next_of_kin_name, Validators.required],
    next_of_kin_no: [this.user.next_of_kin_phone, Validators.required],
    phone_number: [this.user.phone_number, Validators.required]
  });

  constructor(
    private searchService: SearchService,
    private reservatioService: ReservationService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  toggleEmbed() {
    this.showEmbed = !this.showEmbed;
  }

  paymentDone(ref: any) {
    this.title = 'Payment successfull';
    console.log(this.title, ref);
  }

  paymentCancel() {
    this.title = 'Payment failed';
    console.log(this.title);
  }

  setRandomPaymentRef() {
    this.tRef = `${Math.random() * 10000000000000}`;
  }

  onBook(form, ref) {
    this.title = 'Payment successfull';
    console.log(this.title, ref);
    this.reservatioService.makeReservation()
    .subscribe((result) => {
      console.log(result);
      const id = result.id;
      console.log(id);
      this.router.navigate([`/reservation-details/${id}`]);
    });
  }
  ngOnInit() {
    this.search = this.searchService.getSearch();
    this.ticket = this.searchService.getTicket();
    this.schedules = this.searchService.getschedules();
    let adults = this.schedules.filter((ticket: any) => {
      return ticket.ages === 'Adult';
    });
    this.adults = adults;
    let children = this.schedules.filter((ticket: any) => {
      return ticket.ages === 'Children';
    });
    this.children = children;
    this.prices = this.schedules.map((schedule) => {
      return schedule.amount;
    });
    this.total = this.arrSum(this.prices);
    console.log(this.total);
    console.log(this.prices);
    setInterval(() => {
      this.ticket = this.searchService.getTicket();
      this.search = this.searchService.getSearch();
      this.schedules = this.searchService.getschedules();
      let adults = this.schedules.filter((ticket: any) => {
        return ticket.ages === 'Adults';
      });
      this.adults = adults;
      let children = this.schedules.filter((ticket: any) => {
        return ticket.ages == 'Children';
      });
      this.children = children;
      this.prices = this.schedules.map((schedule) => {
        return schedule.amount;
      });
      this.total = this.arrSum(this.prices);
    }, 10000);

    this.setRandomPaymentRef();

  }

  arrSum(arr) {
    return arr.reduce(function(a, b){
      return a + b;
    }, 0);
  }
}

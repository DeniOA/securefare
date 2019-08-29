import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Schedule } from '../schedule/classes/schedule';

@Component({
  selector: 'app-paassenger-add',
  templateUrl: './passenger-add.component.html',
  styleUrls: ['./passenger-add.component.css']
})
export class PassengerAddComponent implements OnInit {
  schedules: Schedule [];
  adults: Schedule[];
  children: Schedule[];
  Trains: Schedule [];
  prices = [];
  total;
  ticket: any;
  ageGroup = []

  title;
  showEmbed = false;
  results = {
    name: ''
  };
  tRef = '';
  result = '';



  reservationForm = this.fb.group({
    firstname: ['', Validators.required],
    fullname: [``, Validators.required],
    lastname: ['', Validators.required],
    gender: ['', Validators.required],
    next_of_kin: ['', Validators.required],
    next_of_kin_no: ['', Validators.required],
    phone_number: ['', Validators.required],
    category: [1]
  });

  profileForm = this.fb
  .group({
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  constructor(
    private searchService: SearchService,
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

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  onAddPassenger(passenger) {
    // this.aliases.push(this.fb.control(''));
    // console.log(this.aliases)
    this.ageGroup.push(passenger);
    console.log(this.ageGroup);
  }

  onMove() {
    this.searchService.setPassengers(this.ageGroup);
    this.router.navigate(['check-out'])
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
    console.log(this.total);
    console.log(this.prices);
    setInterval(() => {
      this.ticket = this.searchService.getTicket();
      this.schedules = this.searchService.getschedules();
      this.prices = this.schedules.map((schedule) => {
        return schedule.amount;
      });
      // let trains = (train: Schedule) => this.schedules.filter((v,i) => names.indexOf(v) === i)
      // let trains = (this.schedules) => this.schedules.filter((v,i) => this.schedules.indexOf(v) === i);
      // console.log(trains);
      let adults = this.schedules.filter((ticket: any) => {
        return ticket.ages === 'Adults';
      });
      this.adults = adults;
      let children = this.schedules.filter((ticket: any) => {
        return ticket.ages === 'Children';
      });
      this.children = children;
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

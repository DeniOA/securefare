import { Component, OnInit } from '@angular/core';
import {  homeApiService } from '../home/services/homeapi.service';
import { Models } from '../home/classes/models';
import { Observable, of } from 'rxjs';
import { NgForm, NgModel} from '@angular/forms';
import {  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { Resched} from './classes/resched';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  lstResched: any;
  reservation;

  public schedules: any[];

  totalAmount;
  scheduleId;
  train_id: any;
  class_type: any;
  ages: any;
  age_id: any;
  age_i: any;

  constructor( http: HttpClient, private _homeApiService: homeApiService, private router: Router, private route: ActivatedRoute ) { 

  }

  ngOnInit() {

    
  //  const  id = this.route.snapshot.paramMap.get("id");

  //  this._homeApiService.getSchedule(id)
  //  .subscribe (
  //    data => 
  //    {
  //      this.lstResched = data;
  //    }
  //  );


      
  //  const  id = this.route.snapshot.paramMap.get("i");

  //  this._homeApiService.getSchedule(id)
  //  .subscribe (
  //    data => 
  //    {
  //      this.lstResched = data;
  //    }
  //  );

  //  this.totalAmount =this._homeApiService.amount;
  //  this.scheduleId =this._homeApiService.schedule_i;
  //  this.class_type =this._homeApiService.ticket_class_i;
  //  this.train_id =this._homeApiService.train_i;
  //  this.ages = this._homeApiService.ages;
  //  this.age_i = this._homeApiService.age_i;





  }

  onReservation(form: NgForm) {

    const reservation_date = form.value.reservation_date;
    const no_of_person = form.value.no_of_person;
    const trip_type= form.value.trip_type;
    const adult = form.value.adult;
    const children = form.value.children;
    const infant = form.value.infant
    const class_type = form.value.class_type;
    const return_date= form.value.return_date;
    const total = form.value.total;
    const res_no= form.value.res_no;
    const user = form.value.user;
    const schedule= form.value.schedule;
    const reservation_status= form.value.reservation_status
    const train_id= form.value.train_id;


    this.reservation = {
     reservation_date: reservation_date,
     no_of_person: no_of_person,
    trip_type: trip_type,
    adult: adult,
    children: children,
   infant: infant,
    class_type:  this.class_type ,
    return_date: return_date,
     total:    this.totalAmount,
     res_no: res_no,
     user: user,
    schedule: this.scheduleId ,
   reservation_status: 1, 
   //default reservation forhomepage is 1.
     train_id:  this.train_id,
     ages: this.ages
     
    };
   
    
    console.log(this.reservation);
    this._homeApiService.postReservation(this.reservation).subscribe(
      response => {
        this.reservation = response;
        console.log(this.reservation);
        //ROUTING WITH CODE INVOLVES IMPORTING THE ROUTER AND USING THE NAVIGATE MTHOD TO ACTIVATE THE ROUTE
        this.router.navigate([`/reservation-details/${this.reservation.id}`]);
        
      },
      error =>  console.log('error', error)
    );
  }

     

}

interface Schedule {
  name: string;
}

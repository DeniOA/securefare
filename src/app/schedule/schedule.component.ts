import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { homeApiService } from '../home/services/homeapi.service';
import { Schedule } from './classes/schedule';
import { ActivatedRoute, Router } from "@angular/router";
import { IAlert } from './classes/alerts';
import { SharedService } from '../home/services/shared.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers:[homeApiService]
})
export class ScheduleComponent implements OnInit {

  constructor(
    http: HttpClient,
    private _homeApiService: homeApiService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private searchService: SearchService
    ) { }


  productAddedTocart: Schedule[];
  cartItemCount: number = 0;
  @Output() cartEvent = new EventEmitter<number>();

  public lstSchedule: Schedule[];
  public alerts: Array<IAlert> = [];
  // lstschedule : any;
  search;

  ngOnInit() {

    // this.search = {
    //   source: this.route.snapshot.queryParamMap.get("source"),
    //   destination:this.route.snapshot.queryParamMap.get("destination"),
    //   check_date:this.route.snapshot.queryParamMap.get("check_date"),
    //   chosen_choice:this.route.snapshot.queryParamMap.get("chosen_choice"),
    //   return_date:this.route.snapshot.queryParamMap.get("return_date")
    // }

    this.search = this.searchService.getSearch();

    this._homeApiService.searchTicket(this.search)
    .subscribe (
      data =>
      {
       this.lstSchedule = data;

      //  console.log(this.lstSchedule);
      }
    );
    // this.router.navigate([`/reservation`],{queryParams:this.lstschedule});

  }




  onAddCart(lstSchedule: Schedule) {
    console.log(lstSchedule);
    // console.log(lstSchedule.age_id);

    this.productAddedTocart = this._homeApiService.getProductFromCart();
    console.log(this.productAddedTocart);
    if (this.productAddedTocart==null) {
      this.productAddedTocart = [];
      this.productAddedTocart.push(lstSchedule);
      this._homeApiService.addProductToCart(this.productAddedTocart);
      this.alerts.push({
        id: 1,
        type: 'success',
        message: 'Ticket added to cart'
      });
      alert('ticket added');
      setTimeout(()=> {
        this.closeAlert(this.alerts);
      },3000);
    }
    else {
      let tempProduct = this.productAddedTocart.find(p=>p.id == lstSchedule.id);
      console.log(tempProduct);
      if(tempProduct == null) {
        this.productAddedTocart.push(lstSchedule);
        this._homeApiService.addProductToCart(this.productAddedTocart);
        this.alerts.push({
          id: 1,
          type: 'success',
          message: 'Ticket added to cart'
        });

        setTimeout(() => {
          this.closeAlert(this.alerts);
        },3000);
      }
      else {
        this.alerts.push({
          id: 2,
          type: 'warning',
          message: 'Ticket already exist'
        });

        setTimeout(() => {
          this.closeAlert(this.alerts);
        },3000);
      }

    }
 //console.log(this.cartItemCount);
 this.cartItemCount=this.productAddedTocart.length;
 // this.cartEvent.emit(this.cartItemCount);
 this.sharedService.updateCartCount(this.cartItemCount);

  }

  public closeAlert(alert:any) {
    const index : number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }



  // test(i) {
  //   console.log(i);
  //   this._homeApiService.amount = this.lstSchedule[i].amount ;
  //   this._homeApiService.schedule_i = this.lstSchedule[i].schedule_i ;
  //   this._homeApiService.train_i = this.lstSchedule[i].train_i ;
  //   this._homeApiService.ticket_class_i = this.lstSchedule[i].ticket_class_i;
  //   this._homeApiService.age_id = this.lstSchedule[i].age_id;
  //   this._homeApiService.ages = this.lstSchedule[i].ages;
  //   this._homeApiService.lstSchedule[i] = this.lstSchedule[i];

  //  console.log(this.lstSchedule[i]);
  //  console.log(this._homeApiService.lstSchedule[i]);



  //   console.log(this._homeApiService.amount);
  //   console.log(this._homeApiService.lstSchedule[i]);

  //   console.log(this._homeApiService.schedule_i);
  //   console.log(this._homeApiService.train_i);
  //   console.log(this._homeApiService.ticket_class_i);

  // }
  //  this.router.navigate([`/cart`],{queryParams:this.lstSchedule[i]});



}

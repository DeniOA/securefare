import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {  HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientModule} from '@angular/common/http';
import { Models } from '../classes/models';
import { Schedule } from '../../schedule/classes/schedule';
import { map } from 'rxjs-compat/operator/map';

// import {  homeApiService } from '../services/homeapi.service'



@Injectable()
export class homeApiService
 {

  amount: number;
  schedule_i: number;
  train_i: number;
  ticket_class_i: number;
  ticket_i: any;
  ages_id: any;
  ages: string;


  age_id: any;
  lstSchedule: Schedule[];

  // from_source: any;

      constructor( private http: HttpClient ) {

      }

      // postHomeForm(models: Models) : Observable<any> {
      //  return  this.http.post('127.0.0.1:8000/ticket/check_price/', models);
      // }

      searchTicket(search: any) : Observable<any> {
        return this.http.post('http://104.248.174.205/ticket/check_price/', search)

      }

      addProductToCart(prodcuts:any) {
        localStorage.setItem('lstSchedule', JSON.stringify(prodcuts));
      }

      getProductFromCart() {
        return JSON.parse(localStorage.getItem('lstSchedule'));
      }

      removeAllProductFromCart() {
        return localStorage.removeItem('lstSchedule');
      }

      errorHandler(error:Response) {
        console.log(error);
        return throwError(error);

      }

      getReservation(id = null) : Observable<any> {
        let param = "";

        if(id){
          param = id+"/";
        }
        return this.http.get(`http://104.248.174.205/ticket/reservation/${param}`)
      }

      postReservation(reservation: any) {
      //   let param = "";

      //   if(i){
      //     param = i+"/";
      //   }
        return this.http.post(`http://104.248.174.205/ticket/reservation/`, reservation)
      }

      getProfile(id =null ) : Observable<any> {
        let param = '';
        if(id) {
          param = id+"/";
        }
        return this.http.get(`http://104.248.174.205/ticket/profile/${id}/`)
      }
}

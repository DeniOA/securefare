import { Component, OnInit } from '@angular/core';
import { Models } from './classes/models';
import { Observable, of } from 'rxjs';
import { FormBuilder, Validators, NgForm, NgModel} from '@angular/forms';
import {  Router, ActivatedRoute } from '@angular/router';
import {  homeApiService } from './services/homeapi.service';
import { HttpClient } from '@angular/common/http';
import { Schedule } from '../schedule/classes/schedule';
import { StationsService } from '../services/stations.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  stations: any[];
  check_date = new Date();
  return_date = new Date();
  source;
  destination;
  chosen_choice;

  lstSchedule: any;
    public sources: any[]
    // public chosen_choice: any[]

  search: any;

  constructor(
    private http: HttpClient,
    private _homeApiService: homeApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private stationService: StationsService,
    private searchService: SearchService
    ) {

    http.get<any[]>('http://104.248.174.205/ticket/station/').subscribe(
            data => {
              this.sources = data;
             console.log(this.sources);
              return this.sources;
            }
        );


        http.get<any[]>('http://104.248.174.205/ticket/choice_type/').subscribe(
          data => {
            this.chosen_choice = data;
           console.log(this.chosen_choice);
            return this.chosen_choice;
          }
      );
  }

  getStations() {
    this.stationService.getAllStations();
    this.stations = this.stationService.getStations();
    this.stationService.getStationsUpdatedListener()
    .subscribe((stations) => {
      this.stations = stations;
    });
  }


  ngOnInit() {
    this.stationService.getAllStations();
    this.stations = this.stationService.getStations();
    this.stationService.getStationsUpdatedListener()
    .subscribe((stations) => {
      this.stations = stations;
    });
    this.getStations();

    // this.search = {
    //   source: this.route.snapshot.queryParamMap.get("from"),
    //   destination:this.route.snapshot.queryParamMap.get("to"),
    //   date:this.route.snapshot.queryParamMap.get("departure")
    // }

    // this._homeApiService.searchTicket(this.search)
    // .subscribe (
    //   data =>
    //   {
    //     this.lstSchedule = data;
    //   }
    // );

  }


  // radioChangeHandler (event:any) {
  //   this.selectedTrip= event.target.value
  //   console.log(this.selectedTrip);
  // }

  onSearch() {
    this.search = {
      chosen_choice: this.chosen_choice,
      source: this.source,
      destination: this.destination,
      check_date1: `${this.check_date.getFullYear()}-${this.check_date.getMonth() + 1}-${this.check_date.getDate()}`,
      check_date: `${this.check_date.getMonth() + 1}/${this.check_date.getDate()}/${this.check_date.getFullYear()}`,
      return_date: `${this.return_date.getMonth() + 1}/${this.return_date.getDate()}/${this.return_date.getFullYear()}`,
      return_date1: `${this.return_date.getFullYear()}-${this.return_date.getMonth() + 1}-${this.return_date.getDate()}`

    };
    this.searchService.setsearch(this.search);
    this.router.navigate([`/schedule`]);
  }
}

interface Source {
  name: string;
}

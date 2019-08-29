import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  private staions: any[];
  private stationsUpdated = new Subject<any[]>();

  constructor(
    private http: HttpClient
  ) { }

    getStations() {
      return this.staions;
    }

    getStationsUpdatedListener() {
      return this.stationsUpdated.asObservable();
    }

  getAllStations() {
    this.http.get<any[]>('http://104.248.174.205/ticket/station/')
  .subscribe(
            data => {
              this.staions = data;
              this.stationsUpdated.next([...this.staions]);
            }
        );
  }
}

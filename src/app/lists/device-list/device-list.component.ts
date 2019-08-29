import { Component } from '@angular/core';
import { listApiServce } from './services/listapi.service';
import {  Comments } from './classes/comments';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html'
})
export class DeviceListComponent {



  constructor(private _listApiService: listApiServce ) {

  }
  lstcomments:Comments[];


  title = 'app';

  ngOnInit(){
    this._listApiService.getcomments()
    .subscribe
    (
      data=> 
      {
        this.lstcomments = data;
        console.log("API CALL", data);
      }
    );
  }
}

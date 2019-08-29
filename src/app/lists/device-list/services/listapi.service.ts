import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Comments } from '../classes/comments';



@Injectable()
export class listApiServce
 {

      constructor(private httpclient: HttpClient) { }

      getcomments(): Observable<any> {
        return this.httpclient.get("http://104.248.174.205/ticket/device/");

      }
  
  
}
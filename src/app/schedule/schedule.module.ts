import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleComponent } from './schedule.component';
import { homeApiService } from '../home/services/homeapi.service';
 import {  HttpModule } from '@angular/http';
 import {  RouterModule } from '@angular/router';





@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    RouterModule,
  
  
  ],
  declarations: [
    // ScheduleComponent
  ],
  providers: [homeApiService]
})
export class ScheduleModule {}

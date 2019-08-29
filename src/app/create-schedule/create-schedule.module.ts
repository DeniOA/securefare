import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { CalendarModule, CalendarDateFormatter } from 'angular-calendar';
import { CreateScheduleRoutes } from './create-schedule.routing';
import { NgbdScheduleComponent } from './schedule/schedule.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HolidayComponent } from './holiday/holiday.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CreateScheduleRoutes),
    FormsModule,
    ReactiveFormsModule, 
    NgbModule,
    CalendarModule.forRoot(),
    QuillModule,
    DragulaModule
  ],
  declarations: [
    NgbdScheduleComponent,
    HolidayComponent]
})
export class CreateScheduleModule {}


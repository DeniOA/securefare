import { Routes } from '@angular/router';


import { NgbdScheduleComponent } from './schedule/schedule.component';
import { HolidayComponent } from './holiday/holiday.component';

export const CreateScheduleRoutes: Routes = [
  {
    path: 'schedule', component: NgbdScheduleComponent,
    // children: [
    //   {
    //     path: 'train',
    //     component: TrainComponent,
    //     data: {
    //       title: 'Train',
    //       urls: [
    //         { title: 'Dashboard', url: '/create-train' },
    //         { title: 'Train' }
    //       ]
    //     }
    //   }
     
    
    // ]
  },
  {
    path: 'holiday', component: HolidayComponent,
  }
];
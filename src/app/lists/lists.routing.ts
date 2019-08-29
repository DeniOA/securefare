import { Routes } from '@angular/router';


import { StaffListComponent } from './staff-list/staff-list.component';
import { AgentListComponent } from './agent-list/agent-list.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { PassengerListComponent } from './passenger-list/passenger-list.component';


export const ListsRoutes: Routes = [
  {
    path: 'staff-list', component: StaffListComponent,
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
    path: 'agent-list', component: AgentListComponent,
  },
  {
    path: 'passenger-list', component: PassengerListComponent,
  },
  {
    path: 'device-list', component: DeviceListComponent,
  }
];
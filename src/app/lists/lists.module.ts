import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {listApiServce} from './device-list/services/listapi.service';

import { ListsRoutes } from './lists.routing';
import { StaffListComponent } from './staff-list/staff-list.component';
import { AgentListComponent } from './agent-list/agent-list.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { PassengerListComponent } from './passenger-list/passenger-list.component';
import { Http } from '@angular/http';





@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ListsRoutes),
    NgxDatatableModule,
    Ng2SmartTableModule,
    HttpClientModule
  ],
  declarations: [
    StaffListComponent,
    AgentListComponent,
    DeviceListComponent,
    PassengerListComponent,

    ],
    providers: [listApiServce]
})
export class ListsModule {}



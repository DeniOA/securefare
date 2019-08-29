import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { Angular4PaystackModule } from 'angular4-paystack';
import { PaymentRoutes } from './payment.routing';
import { TopUpComponent } from './top-up/top-up.component';
import { TopUpService } from '../shared/services/top-up.service';






@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PaymentRoutes),
    NgxDatatableModule,
    Ng2SmartTableModule,
    HttpClientModule,
    Angular4PaystackModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ TopUpComponent ],
    providers: [ CookieService]
})
export class PaymentModule {}
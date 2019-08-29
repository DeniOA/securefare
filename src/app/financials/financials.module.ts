import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { FinancialsRoutes } from './financials.routing';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { DailySalesComponent } from './daily-sales/daily-sales.component';
import { StationSalesComponent } from './station-sales/station-sales.component';
import { ETransactionsComponent } from './e-transactions/e-transactions.component';
import { ESummaryComponent } from './e-summary/e-summary.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FinancialsRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
   TransactionsListComponent,
   DailySalesComponent,
   StationSalesComponent,
   ETransactionsComponent,
   ESummaryComponent
  ]
})
export class FinancialsModule {}
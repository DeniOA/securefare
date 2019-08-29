import { Routes } from '@angular/router';

import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { DailySalesComponent } from './daily-sales/daily-sales.component';
import { StationSalesComponent } from './station-sales/station-sales.component';
import { ETransactionsComponent } from './e-transactions/e-transactions.component';
import { ESummaryComponent } from './e-summary/e-summary.component';


export const FinancialsRoutes : Routes = [
  {
    path: 'transactions-list', component: TransactionsListComponent,
  },
  {
    path: 'daily-sales', component: DailySalesComponent,
  },
  {
    path: 'station-sales', component: StationSalesComponent,
  },
  {
    path: 'e-transactions', component: ETransactionsComponent,
  },
  {
    path: 'e-summary', component: ESummaryComponent,
  }
];

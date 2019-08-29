import { Routes } from '@angular/router';


import { InvoiceComponent } from './invoice/invoice.component';
import { ProfileComponent } from './profile/profile.component';


export const SamplePagesRoutes: Routes = [
  {
    path: 'profile/:id', component: ProfileComponent,
  },
  {
    path: 'invoice', component: InvoiceComponent,
  }
];

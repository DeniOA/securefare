import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PurchasedTicketsComponent } from './purchased-tickets.component';

const routes: Routes = [
  {
    path: 'purchased-tickets',
    data: {
      title: 'Purchased Tickets Page',
    },
    component: PurchasedTicketsComponent
  }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PurchasedTicketsComponent]
})
export class PurchasedTicketsModule{}
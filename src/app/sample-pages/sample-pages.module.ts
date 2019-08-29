import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { SamplePagesRoutes } from './sample-pages.routing';

import { InvoiceComponent } from './invoice/invoice.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from '../shared/services/profile.service';
import { loginApiService } from '../authentication/login2/services/loginapi.service';
import { ProvidersFeature } from '@angular/core/src/render3';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SamplePagesRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
  
    InvoiceComponent,
    ProfileComponent,
  ],

  providers: [ProfileService, loginApiService]
})
export class SamplePagesModule {}

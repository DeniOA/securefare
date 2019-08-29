import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './component.routing';




import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';

import { NgbdratingBasicComponent } from './rating/rating.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    NgbModule
  ],
  declarations: [
  
   
    NgbdDropdownBasicComponent,
  
    NgbdratingBasicComponent,
  
   
  ]
})
export class ComponentsModule { }

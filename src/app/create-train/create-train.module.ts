import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { CreateTrainRoutes } from './create-train.routing';
import { TrainComponent } from './train/train.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CreateTrainRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TrainComponent]
})
export class CreateTrainModule {}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgetsComponent } from './widgets.component';

const routes: Routes = [
  {
    path: 'widgets',
    data: {
      title: 'Widgets Page',
    },
    component: WidgetsComponent
  }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WidgetsComponent]
})
export class WidgetsModule {}

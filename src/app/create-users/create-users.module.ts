import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { CreateUsersRoutes } from './create-users.routing';
import { TellerComponent } from './teller/teller.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { OperatorComponent } from './operator/operator.component';
import { FinanceComponent } from './finance/finance.component';
import { AgentComponent } from './agent/agent.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CreateUsersRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TellerComponent,
    SupervisorComponent,
    OperatorComponent,
    FinanceComponent,
    AgentComponent]
})
export class CreateUsersModule {}
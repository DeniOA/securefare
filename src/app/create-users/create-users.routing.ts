import { Routes } from '@angular/router';


import { TellerComponent } from './teller/teller.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { OperatorComponent } from './operator/operator.component';
import { FinanceComponent } from './finance/finance.component';
import { AgentComponent } from './agent/agent.component';



export const CreateUsersRoutes: Routes = [
  {
    path: 'teller', component: TellerComponent,
  },
  {
    path: 'supervisor', component: SupervisorComponent,
  },
  {
    path: 'operator', component: OperatorComponent,
  },
  {
    path: 'finance', component: FinanceComponent,
  },
  {
    path: 'agent', component: AgentComponent,
  }
];
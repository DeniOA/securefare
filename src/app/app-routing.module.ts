import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ProfileComponent } from './sample-pages/profile/profile.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { CartComponent } from './cart/cart.component';

// import { AuthGuard } from './authentication/auth.guard';
import { PaystackModalComponent } from './paystack-modal/paystack-modal.component';
import { AuthGuardService } from './authentication/data/auth-guard.service';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PassengerAddComponent } from './passenger-add/passenger-add.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { RegisterComponent } from './auth/register/register.component';

// import { CartComponent } from './shopping-cart/cart/cart.component';



const routes: Routes = [

  {
    path: '',
  component: HomeComponent,
  pathMatch: 'full'
  },
  {
    path: 'login',
  component: LoginComponent,
  pathMatch: 'full'
  },
  {
    path: 'register',
  component: RegisterComponent,
  pathMatch: 'full'
  },
  {
    path: 'forgot-password',
  component: ForgotPasswordComponent,
  pathMatch: 'full'
  },
  {
  path: 'ticket-list',
  component: TicketListComponent,
  pathMatch: 'full'
  },
  {
  path: 'add-passengers',
  component: PassengerAddComponent,
  pathMatch: 'full'
  },
  {
  path: 'check-out',
  component: PersonalInfoComponent,
  pathMatch: 'full'
  },
  {
  path: 'schedule',
  component: TicketListComponent,
  pathMatch: 'full'
  },
  {
    path: 'schedule/:id',
    component: ReservationComponent,
    pathMatch: 'full'
  },

  {
    path: 'cart',
    component: CartComponent,
    pathMatch: 'full'
  },
  {
    path: 'cart/:age_id',
    component: CartComponent,
    pathMatch: 'full'
  },
  {
  path: 'reservation',
  component: ReservationComponent,
  pathMatch: 'full'
  },
  {
  path: 'reservation-details/:id',
  component: ReservationDetailsComponent,
  pathMatch: 'full'
  },
  {
  path: 'paystack-modal',
  component: PaystackModalComponent,
  pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: FullComponent,

    canActivate: [AuthGuardService],
    children: [
      // {
      //   path: '',
      //   loadChildren: './dashboards/dashboard.module#DashboardModule'
      // },
      {
        path: ':id',
        loadChildren: './dashboards/dashboard.module#DashboardModule'
      },
      {
        path: 'starter',
        loadChildren: './starter/starter.module#StarterModule'
      },
      {
        path: 'component',
        loadChildren: './component/component.module#ComponentsModule'
      },
      { path: 'icons', loadChildren: './icons/icons.module#IconsModule' },
      { path: 'forms', loadChildren: './form/forms.module#FormModule' },
      { path: 'tables', loadChildren: './table/tables.module#TablesModule' },
      { path: 'charts', loadChildren: './charts/charts.module#ChartModule' },
      {
        path: 'extra-component',
        loadChildren:
        './extra-component/extra-component.module#ExtraComponentsModule'
      },
      // { path: 'apps', loadChildren: './apps/apps.module#AppsModule' },
      // {
      //   path: 'apps/email',
      //   loadChildren: './apps/email/mail.module#MailModule'
      // },
      {
        path: 'sample-pages',
        loadChildren: './sample-pages/sample-pages.module#SamplePagesModule'
      },
      {
        path: 'create-train',
        loadChildren: './create-train/create-train.module#CreateTrainModule'
      },
      {
        path: 'create-users',
        loadChildren: './create-users/create-users.module#CreateUsersModule'
      },
      {
        path: 'lists',
        loadChildren: './lists/lists.module#ListsModule'
      },
      {
        path: 'create-schedule',
        loadChildren: './create-schedule/create-schedule.module#CreateScheduleModule'
      },

      {
        path: 'purchased-tickets',
        loadChildren: './purchased-tickets/purchased-tickets.module#PurchasedTicketsModule'
      },
      {
        path: 'financials',
        loadChildren: './financials/financials.module#FinancialsModule'
      },
      // {
      //   path: 'payment',
      //   loadChildren: './payment/payment.module#PaymentModule'
      // }

    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: '',
        loadChildren:
          './authentication/authentication.module#AuthenticationModule'
      }

    ]
  },
  {
    path: '**',
    redirectTo: '404'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgbModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =  [HomeComponent, ScheduleComponent, CartComponent,PaystackModalComponent, ReservationComponent, ReservationDetailsComponent, FullComponent, BlankComponent]


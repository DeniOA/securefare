import * as $ from 'jquery';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule,
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
import { MatButtonModule,
  MatCheckboxModule, MatExpansionModule, MatIconModule,
  MatCardModule, MatDatepickerModule, MatNativeDateModule,
  MatFormFieldModule, MatInputModule } from '@angular/material';
// import {listApiServce} from './lists/device-list/services/listapi.service'

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthGuardService } from './authentication/data/auth-guard.service';
import { RouteGuardService } from './authentication/data/route-guard.service';
import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { NgbModule, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';

import { ProfileService } from './shared/services/profile.service';
import { CreateTrainModule } from './create-train/create-train.module';
import { CreateUsersModule } from './create-users/create-users.module';
import { ListsModule } from './lists/lists.module';
import { CreateScheduleModule } from './create-schedule/create-schedule.module';
import { FinancialsModule } from './financials/financials.module';
import { HomeModule } from './home/home.module';
import { ScheduleModule } from './schedule/schedule.module';
// import { TicketService } from './shopping-cart/services/ticket.service';

// import { NgbdModalOptions } from './modal-options';


// import { HomeComponent } from './home/home.component';
import { PaymentModule } from './payment/payment.module';
import { CookieService } from 'ngx-cookie-service';
import { homeApiService } from './home/services/homeapi.service';
import { ScheduleComponent } from './schedule/schedule.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { WidgetComponent } from './dashboards/dashboard-components/widget/widget.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { Angular4PaystackModule } from 'angular4-paystack';
import { SamplePagesModule } from './sample-pages/sample-pages.module';
import { CartComponent } from './cart/cart.component';
import { loginApiService } from './authentication/login2/services/loginapi.service';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PassengerAddComponent } from './passenger-add/passenger-add.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { Header2Component } from './header2/header2.component';

// import { CartComponent } from './cart/cart.component';

// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';






const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    // ErrorMessageComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent,
    routingComponents,
    CartComponent,
    TicketListComponent,
    PersonalInfoComponent,
    PassengerAddComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    Header2Component,

    // HomeComponent,
    // ScheduleComponent,
    // WidgetsComponent


  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    PerfectScrollbarModule,
    CreateTrainModule,
    CreateUsersModule,
    SamplePagesModule,
    ListsModule,
    CreateScheduleModule,
    FinancialsModule,
    PaymentModule ,
    Angular4PaystackModule,
    RouterModule,
    HomeModule,
    ScheduleModule,
    QRCodeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule


  ],
  providers: [ CookieService , homeApiService, loginApiService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    AuthGuardService,
    RouteGuardService,
    ProfileService

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

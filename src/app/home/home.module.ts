import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home.component';
import { homeApiService } from './services/homeapi.service';
 import {  HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    RouterModule
  
  ],
  declarations: [
    // HomeComponent
  ],
  providers: [homeApiService]
})
export class HomeModule {}

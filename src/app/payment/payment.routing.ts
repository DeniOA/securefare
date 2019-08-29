import { Routes } from '@angular/router';


import { TopUpComponent } from './top-up/top-up.component';



export const PaymentRoutes: Routes = [
  {
    path: 'topup', component: TopUpComponent,
    // children: [
    //   {
    //     path: 'train',
    //     component: TrainComponent,
    //     data: {
    //       title: 'Train',
    //       urls: [
    //         { title: 'Dashboard', url: '/create-train' },
    //         { title: 'Train' }
    //       ]
    //     }
    //   }
     
  
    // ]
  }
];
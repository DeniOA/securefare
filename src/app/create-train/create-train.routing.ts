import { Routes } from '@angular/router';


import { TrainComponent } from './train/train.component';

export const CreateTrainRoutes: Routes = [
  {
    path: 'train', component: TrainComponent,
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

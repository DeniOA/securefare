import { Routes } from '@angular/router';



import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';

import { NgbdratingBasicComponent } from './rating/rating.component';



export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
   
     
      
      {
        path: 'dropdown',
        component: NgbdDropdownBasicComponent,
        data: {
          title: 'Dropdown',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Dropdown' }
          ]
        }
      },
      
   
      {
        path: 'rating',
        component: NgbdratingBasicComponent,
        data: {
          title: 'Rating',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Rating' }
          ]
        }
      }

    ]
  }
];

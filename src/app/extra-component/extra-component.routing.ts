import { Routes } from '@angular/router';


import { UploadComponent } from './file-upload/upload.component';


export const ExtraComponentsRoutes: Routes = [
  {
    path: '',
    children: [
   
      {
        path: 'upload',
        component: UploadComponent,
        data: {
          title: 'Upload Page',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Upload Page' }
          ]
        }
      }
    ]
  }
];

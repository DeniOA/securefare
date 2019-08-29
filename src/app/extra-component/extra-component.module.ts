import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { DragulaModule } from 'ng2-dragula';
import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

import { ExtraComponentsRoutes } from './extra-component.routing';

import { UploadComponent } from './file-upload/upload.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ExtraComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
   
    DragulaModule,
    QuillModule,
    NgbModule,
    FileUploadModule
  ],
  declarations: [
    UploadComponent,
  
 
  ]
})
export class ExtraComponentsModule {}

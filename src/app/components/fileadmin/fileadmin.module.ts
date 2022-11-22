import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { FileadminRoutingModule } from './fileadmin-routing.module';
import { FileuploadComponent } from './fileupload/fileupload.component';


@NgModule({
  declarations: [
    FileuploadComponent
  ],
  imports: [
    CommonModule,
    FileadminRoutingModule
  ]
})
export class FileadminModule { }

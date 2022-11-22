import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisenoHomogeneoRoutingModule } from './diseno-homogeneo-routing.module';
import { DisenoHomogeneoComponent } from './diseno-homogeneo/diseno-homogeneo.component';


@NgModule({
  declarations: [
    DisenoHomogeneoComponent
  ],
  imports: [
    CommonModule,
    DisenoHomogeneoRoutingModule
  ]
})
export class DisenoHomogeneoModule { }

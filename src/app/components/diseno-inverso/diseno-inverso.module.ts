import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisenoInversoRoutingModule } from './diseno-inverso-routing.module';
import { DisenoInversoComponent } from './diseno-inverso/diseno-inverso.component';


@NgModule({
  declarations: [
    DisenoInversoComponent
  ],
  imports: [
    CommonModule,
    DisenoInversoRoutingModule
  ]
})
export class DisenoInversoModule { }

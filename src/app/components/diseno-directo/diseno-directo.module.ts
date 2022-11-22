import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisenoDirectoRoutingModule } from './diseno-directo-routing.module';
import { DisenoDirectoComponent } from './diseno-directo/diseno-directo.component';


@NgModule({
  declarations: [
    DisenoDirectoComponent
  ],
  imports: [
    CommonModule,
    DisenoDirectoRoutingModule
  ]
})
export class DisenoDirectoModule { }

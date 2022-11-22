import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarSimetriaComponent } from './editar-simetria/editar-simetria.component';
import { ListadoSimetriaComponent } from './listado-simetria/listado-simetria.component';
import { SimetriaComponent } from './simetria/simetria.component';
import { SimetriaRoutingModule } from './simetria-routing.module';
import { ReactiveFormsModule } from '@angular/forms';






@NgModule({
  declarations: [
    EditarSimetriaComponent,
    ListadoSimetriaComponent,
    SimetriaComponent
  ],
  imports: [
    CommonModule, SimetriaRoutingModule, ReactiveFormsModule
  ],
  exports: [
    EditarSimetriaComponent,
    ListadoSimetriaComponent,
    SimetriaComponent
  ]
})
export class SimetriaModule { }

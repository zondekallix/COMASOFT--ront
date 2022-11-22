import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoeficienteRoutingModule } from './coeficiente-routing.module';
import { ListadoCoeficienteComponent } from './listado-coeficiente/listado-coeficiente.component';
import { CoeficienteComponent } from './coeficiente/coeficiente.component';
import { EditarCoeficienteComponent } from './editar-coeficiente/editar-coeficiente.component';


@NgModule({
  declarations: [
    ListadoCoeficienteComponent,
    CoeficienteComponent,
    EditarCoeficienteComponent
  ],
  imports: [
    CommonModule,
    CoeficienteRoutingModule, FormsModule, ReactiveFormsModule
  ],
  exports: [
    ListadoCoeficienteComponent,
    CoeficienteComponent,
    EditarCoeficienteComponent
  ]
})
export class CoeficienteModule { }

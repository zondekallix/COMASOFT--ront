import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoeficientevalorRoutingModule } from './coeficientevalor-routing.module';
import { EditarcoeficientevalorComponent } from './editarcoeficientevalor/editarcoeficientevalor.component';
import { ListadocoeficientevalorComponent } from './listadocoeficientevalor/listadocoeficientevalor.component';
import { CoeficientevalorComponent } from './coeficientevalor/coeficientevalor.component';
import { ListamaterialesComponent } from './listamateriales/listamateriales.component';
import { EditmaterialesComponent } from './editmateriales/editmateriales.component';
import { CoeficientedisponibleComponent } from './coeficientedisponible/coeficientedisponible.component';
import { TablavalorComponent } from './editarcoeficientevalor/tablavalor/tablavalor.component';



@NgModule({
  declarations: [
    EditarcoeficientevalorComponent,
    ListadocoeficientevalorComponent,
    CoeficientevalorComponent,
    ListamaterialesComponent,
    EditmaterialesComponent,
    CoeficientedisponibleComponent,
    TablavalorComponent
  ],
  imports: [
    CommonModule, 
    FormsModule,
    CoeficientevalorRoutingModule, 
    ReactiveFormsModule, 
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [
    ListamaterialesComponent
  ]
})
export class CoeficientevalorModule { }

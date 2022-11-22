import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FibrousDesignerRoutingModule } from './fibrous-designer-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FibrousDesignerComponent } from './fibrous-designer.component';
import { ListadoMaterialesComponent } from './listado-materiales/listado-materiales.component';
import { EditerFdesignerComponent } from './editer-fdesigner/editer-fdesigner.component';
import { ListarCoeficientesComponent } from './listar-coeficientes/listar-coeficientes.component';



@NgModule({
  declarations: [
    FibrousDesignerComponent,
    ListadoMaterialesComponent,
    EditerFdesignerComponent,
    ListarCoeficientesComponent
  ],
  imports: [
    CommonModule, FibrousDesignerRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    FibrousDesignerComponent
  ]
})
export class FibrousDesignerModule { }

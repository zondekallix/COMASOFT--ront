import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarPropiedadComponent } from './editar-propiedad/editar-propiedad.component';
import { ListadoPropiedadComponent } from './listado-propiedad/listado-propiedad.component';
import { PropiedadComponent } from './propiedad/propiedad.component';
import { PropiedadRoutingModule } from './propiedad-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EditarPropiedadComponent,
    ListadoPropiedadComponent,
    PropiedadComponent
  ],
  imports: [
    CommonModule, PropiedadRoutingModule,ReactiveFormsModule
  ]
})
export class PropiedadesModule { }

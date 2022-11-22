import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantillaindicesRoutingModule } from './plantillaindices-routing.module';
import { PlantillaindiceComponent } from './plantillaindice/plantillaindice.component';
import { ListadoComponent } from './listado/listado.component';
import { EditarComponent } from './editar/editar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarindiceComponent } from './editarindice/editarindice.component';


@NgModule({
  declarations: [
    PlantillaindiceComponent,
    ListadoComponent,
    EditarComponent,
    EditarindiceComponent
  ],
  imports: [
    CommonModule,
    PlantillaindicesRoutingModule, ReactiveFormsModule
  ],
  exports:[
    PlantillaindiceComponent,
    ListadoComponent,
    EditarComponent
  ]
})
export class PlantillaindicesModule { }

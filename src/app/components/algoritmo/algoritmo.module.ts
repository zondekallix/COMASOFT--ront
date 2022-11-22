import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlgoritmoRoutingModule } from './algoritmo-routing.module';
import { ListadoAlgoritmoComponent } from './listado-algoritmo/listado-algoritmo.component';
import { EditarAlgoritmoComponent } from './editar-algoritmo/editar-algoritmo.component';
import { AlgoritmoComponent } from './algoritmo/algoritmos.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CoeficientevalorModule } from '../coeficientevalor/coeficientevalor.module';




@NgModule({
    declarations: [
        ListadoAlgoritmoComponent,
        EditarAlgoritmoComponent,
        AlgoritmoComponent,
        FileUploadComponent
    ],
    imports: [
        CommonModule,
        AlgoritmoRoutingModule,
        CoeficientevalorModule
    ]
})
export class algoritmoModule { }

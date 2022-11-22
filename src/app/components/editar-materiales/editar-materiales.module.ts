import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ListadoTipoMaterialComponent } from 'src/app/components/editar-materiales/listado-tipo-material/listado-tipo-material.component';
import { EditarTipomaterialComponent } from 'src/app/components/editar-materiales/editar-tipomaterial/editar-tipomaterial.component';
import { TipoMaterialComponent } from 'src/app/components/editar-materiales/tipo-material/tipo-material.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialtipocoefComponent } from './materialtipocoef/materialtipocoef.component';



@NgModule({
  declarations: [ ListadoTipoMaterialComponent, EditarTipomaterialComponent, TipoMaterialComponent, MaterialtipocoefComponent
],
imports: [
    CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, BrowserModule
  ],
  exports: [
    TipoMaterialComponent ]
})
export class EditarMaterialesModule { }

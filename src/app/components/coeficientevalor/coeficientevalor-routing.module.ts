import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoeficientevalorComponent } from './coeficientevalor/coeficientevalor.component';

const routes: Routes = [
  {
    path: '', component: CoeficientevalorComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoeficientevalorRoutingModule { }

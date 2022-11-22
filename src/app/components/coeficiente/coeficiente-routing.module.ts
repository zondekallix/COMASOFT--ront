import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoeficienteComponent } from './coeficiente/coeficiente.component';

const routes: Routes = [
  {
    path: '', component: CoeficienteComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoeficienteRoutingModule { }

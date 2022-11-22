import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisenoInversoComponent } from './diseno-inverso/diseno-inverso.component';

const routes: Routes = [
  {
    path: '', component: DisenoInversoComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisenoInversoRoutingModule { }

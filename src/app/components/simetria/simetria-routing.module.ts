import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimetriaComponent } from './simetria/simetria.component';


const routes: Routes = [
  {
    path: '', component: SimetriaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimetriaRoutingModule { }

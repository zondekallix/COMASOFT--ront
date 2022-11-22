import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlgoritmoComponent } from './algoritmo/algoritmos.component';

const routes: Routes = [
  {
    path: '', component: AlgoritmoComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlgoritmoRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisenoDirectoComponent } from './diseno-directo/diseno-directo.component';

const routes: Routes = [
  {
    path: '', component: DisenoDirectoComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisenoDirectoRoutingModule { }

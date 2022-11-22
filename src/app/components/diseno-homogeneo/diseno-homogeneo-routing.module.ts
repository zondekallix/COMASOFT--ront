import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisenoHomogeneoComponent } from './diseno-homogeneo/diseno-homogeneo.component';

const routes: Routes = [
  {
    path: '', component: DisenoHomogeneoComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisenoHomogeneoRoutingModule { }

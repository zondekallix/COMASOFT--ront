import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropiedadComponent } from './propiedad/propiedad.component';




const routes: Routes = [
  {
    path: '', component: PropiedadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropiedadRoutingModule { }

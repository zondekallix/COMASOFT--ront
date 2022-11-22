import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantillaindiceComponent } from './plantillaindice/plantillaindice.component';



const routes: Routes = [
  {
    path: '', component: PlantillaindiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantillaindicesRoutingModule { }

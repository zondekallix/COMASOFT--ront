import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InftecnicaComponent } from './inftecnica.component';



const routes: Routes = [
  {
    path: '', component: InftecnicaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InftecnicaRoutingModule { }

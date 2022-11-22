import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FibrousDesignerComponent } from './fibrous-designer.component';

const routes: Routes = [
  {
    path: '', component: FibrousDesignerComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FibrousDesignerRoutingModule { }

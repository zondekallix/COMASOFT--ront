import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaminousDesignerComponent } from './laminous-designer.component';

const routes: Routes = [
  {
    path: '', component: LaminousDesignerComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaminousDesignerRoutingModule { }

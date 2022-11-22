import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupNavbarComponent } from './sup-navbar/sup-navbar.component';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { InfNavbarComponent } from './inf-navbar/inf-navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { TipoMaterialComponent } from '../editar-materiales/tipo-material/tipo-material.component';

const routes : Routes = [
  {
    path: 'material', component : TipoMaterialComponent
  }
];

@NgModule({
  declarations: [SupNavbarComponent, InfNavbarComponent],
  imports: [
    CommonModule, MdbCollapseModule, MdbCheckboxModule, RouterModule.forChild(routes)
  ],
  exports:[
    SupNavbarComponent, InfNavbarComponent
  ]
})
export class SupNavbarModule { }

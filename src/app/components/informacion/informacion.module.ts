import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InftecnicaComponent } from './inftecnica/inftecnica.component';
import { InftecnicaRoutingModule } from './inftecnica/inftecnica-routing.module';




@NgModule({
  declarations: [
    InftecnicaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InftecnicaComponent, InftecnicaRoutingModule
  ]

})
export class InformacionModule { }

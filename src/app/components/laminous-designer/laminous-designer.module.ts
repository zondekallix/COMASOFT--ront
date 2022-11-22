import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaminousDesignerComponent } from './laminous-designer.component';
import { LaminousDesignerRoutingModule } from './laminous-designer-routing.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    LaminousDesignerComponent,

  ],
  imports: [
    CommonModule, LaminousDesignerRoutingModule,
    ReactiveFormsModule, FormsModule
  ],
  exports: [
    LaminousDesignerComponent
  ]
})
export class LaminousDesignerModule { }

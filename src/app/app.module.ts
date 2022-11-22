import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { SupNavbarModule } from './components/sup-navbar/sup-navbar.module';
import { RouterModule, Routes } from '@angular/router';
import { MaterialTypeService } from './services/material-type-service.service';

import { HomeModule } from './components/home/home/home.module';
import { HomeComponent } from './components/home/home/home.component';
import { TipoMaterialComponent } from './components/editar-materiales/tipo-material/tipo-material.component';
import { EditarMaterialesModule } from './components/editar-materiales/editar-materiales.module';
import { SimetriaModule } from './components/simetria/simetria.module';
import { SimetriaComponent } from './components/simetria/simetria/simetria.component';
import { PropiedadComponent } from './components/propiedades/propiedad/propiedad.component';
import { DisenoDirectoComponent } from './components/diseno-directo/diseno-directo/diseno-directo.component';
import { DisenoInversoComponent } from './components/diseno-inverso/diseno-inverso/diseno-inverso.component';
import { DisenoHomogeneoComponent } from './components/diseno-homogeneo/diseno-homogeneo/diseno-homogeneo.component';
import { InftecnicaComponent } from './components/informacion/inftecnica/inftecnica.component';
import { PlantillaindiceComponent } from './components/plantillaindices/plantillaindice/plantillaindice.component';
import { CoeficientevalorComponent } from './components/coeficientevalor/coeficientevalor/coeficientevalor.component';
import { FibrousDesignerComponent } from './components/fibrous-designer/fibrous-designer.component';
import { FibrousDesignerModule } from './components/fibrous-designer/fibrous-designer.module';
import { LaminousDesignerModule } from './components/laminous-designer/laminous-designer.module';
import { AlgoritmoComponent } from './components/algoritmo/algoritmo/algoritmos.component';






//esto es para las rutas, si no funciona borrar
const routes : Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'material', component: TipoMaterialComponent},
  {path: 'simetria', component: SimetriaComponent},
  {path: 'propiedad', component: PropiedadComponent},
  {path: 'directo', component: DisenoDirectoComponent},
  {path: 'inverso', component: DisenoInversoComponent},
  {path: 'homogeneo', component: DisenoHomogeneoComponent},
  {path: 'informacion', component: InftecnicaComponent},
  {path: 'plantillaindice', component: PlantillaindiceComponent},
  {path: 'coeficientevalor', component: CoeficientevalorComponent},
  {path: 'fibrousdesigner', component: FibrousDesignerComponent},
  {path: 'laminatedesigner', component: FibrousDesignerComponent},
  {path: 'algoritmo', component: AlgoritmoComponent},
  
  {path: '**', redirectTo: 'home'}
]

//rutas

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MdbCollapseModule,
    MdbCheckboxModule,
    SupNavbarModule,
    RouterModule.forChild(routes),
    HomeModule,
    EditarMaterialesModule,
    SupNavbarModule,
    SimetriaModule,
    FibrousDesignerModule,
    LaminousDesignerModule

  ],
  providers: [ MaterialTypeService ],
  bootstrap: [AppComponent]
})
export class AppModule { }



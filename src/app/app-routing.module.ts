import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {path: 'home', loadChildren: () => import('./components/home/home.module').then(m =>  m.HomeModule)},
  {path: 'simetria', loadChildren: () => import('./components/simetria/simetria.module').then(m =>  m.SimetriaModule)},
  {path: 'propiedad', loadChildren: () => import('./components/propiedades/propiedades.module').then(m =>  m.PropiedadesModule)},
  {path: 'coeficiente', loadChildren: () => import('./components/coeficiente/coeficiente.module').then(m =>  m.CoeficienteModule)},
  {path: 'directo', loadChildren: () => import('./components/diseno-directo/diseno-directo.module').then(m =>  m.DisenoDirectoModule)},
  {path: 'inverso', loadChildren: () => import('./components/diseno-inverso/diseno-inverso.module').then(m =>  m.DisenoInversoModule)},
  {path: 'homogeneo', loadChildren: () => import('./components/diseno-homogeneo/diseno-homogeneo.module').then(m =>  m.DisenoHomogeneoModule)},
  {path: 'informacion', loadChildren: () => import('./components/informacion/informacion.module').then(m =>  m.InformacionModule)},
  {path: 'plantillaindice', loadChildren: () => import('./components/plantillaindices/plantillaindices.module').then(m =>  m.PlantillaindicesModule)},
  {path: 'coeficientevalor', loadChildren: () => import('./components/coeficientevalor/coeficientevalor.module').then(m =>  m.CoeficientevalorModule)},
  {path: 'fibrousdesigner', loadChildren: () => import('./components/fibrous-designer/fibrous-designer.module').then(m =>  m.FibrousDesignerModule)},
  {path: 'laminatedesigner', loadChildren: () => import('./components/laminous-designer/laminous-designer.module').then(m =>  m.LaminousDesignerModule)},
  {path: 'algoritmo', loadChildren: () => import('./components/algoritmo/algoritmo.module').then(m =>  m.algoritmoModule)}
];
 


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }

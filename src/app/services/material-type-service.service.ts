
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

//import { ListadoTipoMaterialComponent } from 'src/app/components/editar-materiales/listado-tipo-material/listado-tipo-material.component';//'../components/editarMateriales/listado-tipo-material/listado-tipo-material.component';
import { MaterialTypesM } from '../models/MaterialTypes';



@Injectable({  providedIn: 'root' })

export class MaterialTypeService {

myAPIUrl : string = "http://localhost:5000/api/MaterialTypes/";
listadoTipos : MaterialTypesM[];

constructor( private http: HttpClient ) { }

private actualizarformulario = new BehaviorSubject<MaterialTypesM>({ } as any);

actualizar ( tipo: MaterialTypesM){
  this.actualizarformulario.next(tipo);
}

getAllTipos$(): Observable<MaterialTypesM>{
  return this.actualizarformulario.asObservable();
}

getAllTipos () {
  this.http.get (this.myAPIUrl).subscribe ( data => {
      //console.log (data);
      this.listadoTipos = data as MaterialTypesM[];
  })
}

putTipo (id: Number, tipo: MaterialTypesM ): Observable<MaterialTypesM>{
  return this.http.put <MaterialTypesM>(this.myAPIUrl + id, tipo);
}

postTipo<MaterialTypesM> (tipo: MaterialTypesM) : Observable<MaterialTypesM> {
  return this.http.post <MaterialTypesM> (this.myAPIUrl, tipo);
}

deleteTipo(id: Number): Observable<MaterialTypesM> {
  return this.http.delete<MaterialTypesM>(this.myAPIUrl + id);
}

}

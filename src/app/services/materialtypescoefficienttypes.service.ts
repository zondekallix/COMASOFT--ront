import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MaterialTypesCoefficientTypes } from '../models/MaterialTypesCoefficientTypes';

@Injectable({
  providedIn: 'root'
})
export class MaterialtypescoefficienttypesService {

  myAPIUrl : string = "http://localhost:5000/api/MaterialTypesCoefficientTypes/";
  materialCoeficienteTipos : MaterialTypesCoefficientTypes [];

  constructor( private http: HttpClient ) { }

  private actualizarformulario = new BehaviorSubject<MaterialTypesCoefficientTypes>({ } as any);

  actualizar ( tipo: MaterialTypesCoefficientTypes ){
    this.actualizarformulario.next(tipo);
  }

  getAll$(): Observable<MaterialTypesCoefficientTypes>{
    return this.actualizarformulario.asObservable();
  }

  getAll () {
    let data: MaterialTypesCoefficientTypes
    this.http.get (this.myAPIUrl).subscribe ( data => {
        //console.log (data);
        this.materialCoeficienteTipos = data as MaterialTypesCoefficientTypes[];
        //console.log (this.coeficienteTipos);
    })
  }

  getAllObs (): Observable<MaterialTypesCoefficientTypes[]> {
    return this.http.get<MaterialTypesCoefficientTypes[]>(this.myAPIUrl);

  }

  putTipo (id: Number, tipo: MaterialTypesCoefficientTypes ): Observable<MaterialTypesCoefficientTypes>{
    return this.http.put <MaterialTypesCoefficientTypes>(this.myAPIUrl + id, tipo);
  }

  postTipo (tipo: MaterialTypesCoefficientTypes) : Observable<MaterialTypesCoefficientTypes> {
    return this.http.post <MaterialTypesCoefficientTypes> (this.myAPIUrl, tipo);
  }

  deleteTipo(id: Number): Observable<MaterialTypesCoefficientTypes> {
    return this.http.delete<MaterialTypesCoefficientTypes>(this.myAPIUrl + id);
  }

}

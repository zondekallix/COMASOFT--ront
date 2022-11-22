import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


import { CoefficientTypes } from '../models/CoefficientType';

@Injectable({ providedIn: 'root' })

export class CoefficientTypesService {
  myAPIUrl : string = "http://localhost:5000/api/CoefficientTypes/";
  tipoCoeficiente: CoefficientTypes[];

  constructor( private http: HttpClient ) { }

  private actualizarformulario = new BehaviorSubject<CoefficientTypes>({ } as any);


  actualizar ( tipo: CoefficientTypes){
    this.actualizarformulario.next(tipo);
  }

  getAll$(): Observable<CoefficientTypes>{
    return this.actualizarformulario.asObservable();
  }

  getAll () {
    this.http.get (this.myAPIUrl).subscribe ( data => {
        //console.log (data);
        this.tipoCoeficiente = data as CoefficientTypes[];
    })
  }

  put (id: Number, tipo: CoefficientTypes ): Observable<CoefficientTypes>{
    return this.http.put <CoefficientTypes>(this.myAPIUrl + id, tipo);
  }

  post<MaterialTypesM> (tipo: CoefficientTypes) : Observable<CoefficientTypes> {
    return this.http.post <CoefficientTypes> (this.myAPIUrl, tipo);
  }

  delete(id: Number): Observable<CoefficientTypes> {
    return this.http.delete<CoefficientTypes>(this.myAPIUrl + id);
  }

}

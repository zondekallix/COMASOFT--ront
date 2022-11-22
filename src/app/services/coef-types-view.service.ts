import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { BehaviorSubject, Observable, throwError } from 'rxjs';


import { CoefTypeView } from '../models/CoefTypeView';




@Injectable({  providedIn: 'root' })

export class CoefficientTypesViewService {

  myAPIUrl : string = "http://localhost:5000/api/CoefTypePropViews/";
  coeficienteTipos : CoefTypeView [];

  constructor( private http: HttpClient ) { }

  private actualizarformulario = new BehaviorSubject<CoefTypeView>({ } as any);

  actualizar ( tipo: CoefTypeView ){
    this.actualizarformulario.next(tipo);
  }

  getAllTipos$(): Observable<CoefTypeView>{
    return this.actualizarformulario.asObservable();
  }

  getAll () {
    this.http.get (this.myAPIUrl).subscribe ( data => {
        //console.log (data);
        this.coeficienteTipos = data as CoefTypeView[];
        //console.log (this.coeficienteTipos);
    })
  }

  putTipo (id: Number, tipo: CoefTypeView ): Observable<CoefTypeView>{
    return this.http.put <CoefTypeView>(this.myAPIUrl + id, tipo);
  }

  postTipo<CoefTypeView> (tipo: CoefTypeView) : Observable<CoefTypeView> {
    return this.http.post <CoefTypeView> (this.myAPIUrl, tipo);
  }

  deleteTipo(id: Number): Observable<CoefTypeView> {
    return this.http.delete<CoefTypeView>(this.myAPIUrl + id);
  }


}

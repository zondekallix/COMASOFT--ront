import { Injectable } from '@angular/core';
import { PropertiesM } from '../models/Properties';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  myAPIUrl : string = "http://localhost:5000/api/PropertiesCoeffs/";
  propertyList : PropertiesM[];

  constructor( private http: HttpClient ) { }

  private actualizarformulario = new BehaviorSubject<PropertiesM>({ } as any);

  actualizar ( tipo: PropertiesM){
    this.actualizarformulario.next(tipo);
  }

  getAllTipos$(): Observable<PropertiesM>{
    return this.actualizarformulario.asObservable();
  }

  getAllTipos () {
    this.http.get (this.myAPIUrl).subscribe ( data => {
        //console.log (data);
        this.propertyList = data as PropertiesM[];
    })
  }

  putTipo (id: Number, tipo: PropertiesM ): Observable<PropertiesM>{
    return this.http.put <PropertiesM>(this.myAPIUrl + id, tipo);
  }

  postTipo<PropertiesModel> (tipo: PropertiesModel) : Observable<PropertiesModel> {
    return this.http.post <PropertiesModel> (this.myAPIUrl, tipo);
  }

  deleteTipo(id: Number): Observable<PropertiesM> {
    return this.http.delete<PropertiesM>(this.myAPIUrl + id);
  }

}

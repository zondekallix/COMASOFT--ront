import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { FibrousDesignerM } from '../models/FibrousDesigner';
import { FunctionResultsM } from '../models/FunctionResults';
import { FunctionMultipleResultsM } from '../models/FunctionMultipleResults';


@Injectable({
  providedIn: 'root'
})
export class FibrousDesignerService {

  myAPIUrl : string = "http://localhost:5000/api/FibrousDesigner/";
  simpleRun: string = "putData/";
  multipleRun:string = "putDataMult/"
  listadoTipos : FibrousDesignerM[];
  constructor( private http: HttpClient ) { }


  putTipo (tipo: FibrousDesignerM ): Observable<FunctionResultsM>{
    return this.http.put <FunctionResultsM>(this.myAPIUrl+this.simpleRun, tipo);
  }

  putMultiple(tipo:FibrousDesignerM): Observable<FunctionMultipleResultsM>{
    return this.http.put<FunctionMultipleResultsM>(this.myAPIUrl+ this.multipleRun,tipo)
  }

}

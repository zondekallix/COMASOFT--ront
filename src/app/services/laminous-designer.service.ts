import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FunctionResultsM } from '../models/FunctionResults';
import { LaminousDesignerM } from '../models/LaminousDesigner';

@Injectable({
  providedIn: 'root'
})
export class LaminousDesignerService {
  myAPIUrl : string = "http://localhost:5000/api/FibrousDesigner/putData/";
  listadoTipos : LaminousDesignerM[];
  constructor( private http: HttpClient ) { }


  putTipo (tipo: LaminousDesignerM ): Observable<FunctionResultsM>{
    return this.http.put <FunctionResultsM>(this.myAPIUrl, tipo);
  }
}

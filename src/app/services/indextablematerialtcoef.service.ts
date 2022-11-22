import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IndexTableMaterialTcoefTs } from '../models/IndexTableMaterialTcoefTs';

@Injectable({  providedIn: 'root' })

export class IndextablematerialtcoefService {
  myAPIUrl : string = "http://localhost:5000/api/IndexTableMaterialTcoefTs/";

  constructor( private http: HttpClient ) { }

  getAllObs (): Observable<IndexTableMaterialTcoefTs[]> {
    return this.http.get<IndexTableMaterialTcoefTs[]> (this.myAPIUrl);
  }
}

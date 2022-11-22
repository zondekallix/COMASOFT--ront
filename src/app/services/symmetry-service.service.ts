import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SymmetryM } from '../models/Symmetry';

@Injectable({
  providedIn: 'root'
})
export class SymmetryServiceService {
  myAPIUrl : string = "http://localhost:5000/api/SymmetryMaterials/";
  simmetryList : SymmetryM[];

  constructor( private http: HttpClient ) { }

  private actualizarformulario = new BehaviorSubject<SymmetryM>({ } as any);

  actualizar ( tipo: SymmetryM){
    this.actualizarformulario.next(tipo);
  }

  getAllTipos$(): Observable<SymmetryM>{
    return this.actualizarformulario.asObservable();
  }

  getAllTipos () {
    this.http.get (this.myAPIUrl).subscribe ( data => {
        //console.log (data);
        this.simmetryList = data as SymmetryM[];
    })
  }

  putTipo (id: Number, tipo: SymmetryM ): Observable<SymmetryM>{
    return this.http.put <SymmetryM>(this.myAPIUrl + id, tipo);
  }

  postTipo<SymmetryModel> (tipo: SymmetryModel) : Observable<SymmetryModel> {
    console.log (tipo);
    return this.http.post <SymmetryModel> (this.myAPIUrl, tipo);
  }

  deleteTipo(id: Number): Observable<SymmetryM> {
    return this.http.delete<SymmetryM>(this.myAPIUrl + id);
  }
}

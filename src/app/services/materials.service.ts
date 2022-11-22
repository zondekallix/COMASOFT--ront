import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Materials } from '../models/Materials';

@Injectable({ providedIn: 'root' })

export class MaterialsService {

  myAPIUrl : string = "http://localhost:5000/api/Materials/";
  materiales: Materials[];

  constructor(private http: HttpClient) { }

  private actualizarformulario = new BehaviorSubject<Materials>({ } as any);

actualizar ( tipo: Materials){
  this.actualizarformulario.next(tipo);
}

getAllTipos$(): Observable<Materials>{
  return this.actualizarformulario.asObservable();
}

getAllTipos () {
  this.http.get (this.myAPIUrl).subscribe ( data => {
      console.log (data);
      this.materiales = data as Materials[];
  })
}

putTipo (id: Number, tipo: Materials ): Observable<Materials>{
  return this.http.put <Materials>(this.myAPIUrl + id, tipo);
}

postTipo<Materials> (tipo: Materials) : Observable<Materials> {
  return this.http.post <Materials> (this.myAPIUrl, tipo);
}

deleteTipo(id: Number): Observable<Materials> {
  return this.http.delete<Materials>(this.myAPIUrl + id);
}


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MaterialDataTypSyms } from '../models/MaterialDataTypSyms';

@Injectable({   providedIn: 'root' })

export class MaterialDataTypSymsService {

  myAPIUrl : string = "http://localhost:5000/api/MaterialDataTypSyms/";
  tipoMaterialView: MaterialDataTypSyms[];
  
  constructor( private http: HttpClient ) { }

  private actualizarformulario = new BehaviorSubject<MaterialDataTypSyms>({ } as any);

  actualizar ( tipo: MaterialDataTypSyms){
    this.actualizarformulario.next(tipo);
  }

  getAll$(): Observable<MaterialDataTypSyms>{
    return this.actualizarformulario.asObservable();
  }

  getAll () {
    this.http.get (this.myAPIUrl).subscribe ( data => {
        //console.log (data);
        this.tipoMaterialView = data as MaterialDataTypSyms[];
    })
  }
  
  //este servicio no lleva mas nada porque es una vista
}

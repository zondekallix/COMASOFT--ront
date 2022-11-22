import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, subscribeOn } from 'rxjs';

import { InternalService } from '../components/coeficientevalor/internal.service';
import { Coefficients } from '../models/Coefficients';
import { IndexTables } from '../models/IndexTables';

@Injectable({ providedIn: 'root' })
export class CoefficientsService {
  myAPIUrl : string = "http://localhost:5000/api/Coefficients/";
  myAPIUrl_byId: string = "GetCoeffbyMaterial/"
  public coeficientesvalor : Coefficients [];
  public coeficientesvalorbyIdMaterial : Coefficients [];
  public coeficientesvalorbyIdMaterialidCtype: Coefficients [];
  constructor(private http: HttpClient,
    public internalservice: InternalService
    ) {
      this.coeficientesvalor = [];
      this.coeficientesvalorbyIdMaterial = [];
      this.coeficientesvalorbyIdMaterialidCtype = [];
     }

    private actualizarformulario = new BehaviorSubject<Coefficients>({ } as any);

    actualizar ( tipo: Coefficients ){ this.actualizarformulario.next(tipo); }

    getAll$(): Observable<Coefficients>{ return this.actualizarformulario.asObservable(); }

    getAll () {
      this.http.get (this.myAPIUrl).subscribe ( data => {
        this.coeficientesvalor = data as Coefficients[];
        this.internalservice.coeficienteexistente = data as Coefficients[];
      })
    }

    getAll_IdMaterial(idMaterial:Number): Observable<Coefficients[]>
    {
      return this.http.get<Coefficients[]>(this.myAPIUrl+this.myAPIUrl_byId+""+idMaterial)
    }
    getAll_byIdMaterial(idMaterial:Number)
    {
      let observable = this.getAll_IdMaterial(idMaterial);
      observable.subscribe(data => this.coeficientesvalorbyIdMaterial = data);
    }



    getAllbyIdMaterial (idMaterialparametro: Number) {
      this.coeficientesvalorbyIdMaterial =[];
      this.http.get (this.myAPIUrl).subscribe ( data => {
        this.coeficientesvalor = data as Coefficients[];
        this.coeficientesvalor.forEach( elemento => {
        if (elemento.idMaterial=== idMaterialparametro){
          this.coeficientesvalorbyIdMaterial.push (elemento);
        }
        })
      })
    }

    getAllbyIdMaterialIdCtype (idMaterialparametro: Number, idCtypeparametro: Number) {

      if (idMaterialparametro != undefined && idCtypeparametro != undefined){
        let coficientelocal : Coefficients [];
        this.coeficientesvalorbyIdMaterialidCtype =[];
        this.http.get (this.myAPIUrl).subscribe ( data => {
          this.coeficientesvalor = data as Coefficients[];
          this.coeficientesvalor.forEach( elemento => {
          if (elemento.idMaterial=== idMaterialparametro && elemento.idCtype === idCtypeparametro ){
            this.coeficientesvalorbyIdMaterialidCtype.push (elemento);
          }
          })
        })
      }

    }

    getAllObs (): Observable<Coefficients[]> {
      return this.http.get<Coefficients[]>(this.myAPIUrl);

    }
    put (id: Number, tipo: Coefficients ): Observable<Coefficients>{
      //console.log (tipo);
      return this.http.put <Coefficients>(this.myAPIUrl + id, tipo);
    }

    post<MaterialTypesM> (tipo: Coefficients) : Observable<Coefficients> {
      return this.http.post <Coefficients> (this.myAPIUrl, tipo);
    }

    delete(id: Number): Observable<Coefficients> {
      return this.http.delete<Coefficients>(this.myAPIUrl + id);
    }

}

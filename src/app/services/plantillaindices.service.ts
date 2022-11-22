import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InternalService } from '../components/coeficientevalor/internal.service';
import { IndexTables } from '../models/IndexTables';

@Injectable({
  providedIn: 'root'
})
export class PlantillaindicesService {
  myAPIUrl : string = "http://localhost:5000/api/IndexTables/";
  indices: IndexTables[] = [];
  private indiceslocal: IndexTables[];

  constructor( private http: HttpClient,
    public internalservice: InternalService
    ) { }

  private actualizarformulario = new BehaviorSubject<IndexTables>({ } as any);

  actualizar ( tipo: IndexTables){
    this.actualizarformulario.next(tipo);
  }

  getAll$(): Observable<IndexTables>{
    return this.actualizarformulario.asObservable();
  }

  getAll () {
    this.http.get (this.myAPIUrl).subscribe ( data => {
      this.indices = data as IndexTables[];
      //console.log (this.indices);
    })
  }

  getAllfitros ( idCtypeP: Number, idSymmetryP: Number) {
    console.log ('servicio plantilla')
    console.log (idCtypeP);
    console.log (idSymmetryP);
    this.indices = [];
    this.http.get (this.myAPIUrl).subscribe ( data => {
      this.indiceslocal = data as IndexTables[];
      //console.log (this.indiceslocal);
      if (this.indiceslocal.length>0){
        //console.log ('dentro del if')
        this.indiceslocal.forEach(element => {
          //console.log (element);
          const idCtypelocal = element.idCtype;
          const idSymmetrylocal = element.idSymmetry;

          if (idCtypeP === idCtypelocal && idSymmetryP === idSymmetrylocal) {
            //console.log (element);
            this.indices.push (element);
          }
        });
      }
    })    //console.log (this.indices);
  }

  getAllSimetriasFiltro ( idCtypeP: Number, idSymmetryP: Number) {
    console.log ('servicio getAllSimetriasFiltro')
    console.log (idCtypeP);
    console.log (idSymmetryP);
    var indicessalida : IndexTables[] = [];
    this.http.get (this.myAPIUrl).subscribe ( data => {
      this.indiceslocal = data as IndexTables[];
      //console.log (this.indiceslocal);
      if (this.indiceslocal.length>0){
        //console.log ('dentro del if')
        this.indiceslocal.forEach(element => {
          //console.log (element);
          const idCtypelocal = element.idCtype;
          const idSymmetrylocal = element.idSymmetry;

          if (idCtypeP === idCtypelocal && idSymmetryP === idSymmetrylocal) {
            //console.log (element);
            indicessalida.push (element);
          }
        });


      }

    })    //console.log (this.indices);
    this.internalservice.tablaindicesdisponibles = indicessalida;
        //console.log (indicessalida);
        //console.log (this.internalservice.tablaindicesdisponibles);
  }


  getAllSimetriasFiltroObs (): Observable <IndexTables[]> {
    return this.http.get <IndexTables[]> (this.myAPIUrl);
  }

 


  getindicesimetria ( idSymmetryP: Number) {

    //console.log (idSymmetryP);
    this.indices = [];
    this.http.get (this.myAPIUrl).subscribe ( data => {
      this.indiceslocal = data as IndexTables[];
      //console.log (this.indiceslocal);
      if (this.indiceslocal.length>0){
        //console.log ('dentro del if')
        this.indiceslocal.forEach(element => {
          //console.log (element);
          const idCtypelocal = element.idCtype;
          const idSymmetrylocal = element.idSymmetry;

          if ( idSymmetryP === idSymmetrylocal ) {
            //console.log (element);
            this.indices.push (element);
          }
        });
      }
    })    //console.log (this.indices);
  }

  put (id: Number, tipo: IndexTables ): Observable<IndexTables>{
    console.log (tipo);
    return this.http.put <IndexTables>(this.myAPIUrl + id, tipo);
  }

  post<MaterialTypesM> (tipo: IndexTables) : Observable<IndexTables> {
    return this.http.post <IndexTables> (this.myAPIUrl, tipo);
  }

  delete(id: Number): Observable<IndexTables> {
    return this.http.delete<IndexTables>(this.myAPIUrl + id);
  }
}

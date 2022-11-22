
import {HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders, HttpRequest, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlgorithmInfo } from '../models/AlgorithmInfo';
import { RequestFunctionDataM } from '../models/RequestFunctionData';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  myAPIUrl : string = "http://localhost:5000/api/Algoritmo/";
  httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})
};
file:any
fileInfo: AlgorithmInfo[];
filtredData: AlgorithmInfo[];
private actualizarformulario = new BehaviorSubject<AlgorithmInfo>({ } as any);


constructor(private http: HttpClient) {
  this.fileInfo = [] ;
 }

selectFiles(e:any){
  this.file = e.target.files[0];
}

upload(file: File): Observable<HttpEvent<any>> {
  let formData: FormData = new FormData();
  formData.append('file', file);

  const req = new HttpRequest('POST', `${this.myAPIUrl}upload`, formData, {
    reportProgress: true,
    responseType: 'json'
  });

  return this.http.request(req);
}

actualizar ( tipo: AlgorithmInfo){
  this.actualizarformulario.next(tipo);
}
getFiles$(): Observable<AlgorithmInfo>{
  return this.actualizarformulario.asObservable();
}
getFiles(){
  this.http.get(this.myAPIUrl).subscribe(data => this.fileInfo = data as AlgorithmInfo[])
}
// getFilesWithConditon(idMaterialType: Number ,geometryName:string)
// {
//   let queryParams = new HttpParams();
//   queryParams = queryParams.append("idMaterialType",2 as number);
//   queryParams = queryParams.append("geometryName","Hexagonal");
//   queryParams = queryParams.append("compositeName","")
//   this.http.get(this.myAPIUrl+"filter",{params:queryParams}).subscribe(data => {this.fileInfo = data as AlgorithmInfo[]});
// }

getFilesWithConditon(idMaterialType: Number ,geometryName:string,compositeName:string)
{
  let dataToFilter = new AlgorithmInfo();
  dataToFilter.nombrefile = "";
  dataToFilter.tipocompuesto = compositeName;
  dataToFilter.idMtype = idMaterialType;
  dataToFilter.tipogeometria = geometryName;

  this.http.post(this.myAPIUrl+"filter",dataToFilter).subscribe(data => {this.filtredData = data as AlgorithmInfo[]});
}


putTipo (id: Number, tipo: AlgorithmInfo ): Observable<AlgorithmInfo>{
  return this.http.put <AlgorithmInfo>(this.myAPIUrl + id, tipo);
}

postTipo<AlgorithmInfo> (tipo: AlgorithmInfo) : Observable<AlgorithmInfo> {
  return this.http.post <AlgorithmInfo> (this.myAPIUrl, tipo);
}

deleteTipo(id: Number): Observable<AlgorithmInfo> {
  return this.http.delete<AlgorithmInfo>(this.myAPIUrl + id);
}

}
